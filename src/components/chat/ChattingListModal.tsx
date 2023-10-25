import { PropsWithChildren, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useSetRecoilState, useRecoilState } from "recoil";
import { getChattingList } from "../../apis/chatting/chatting";
import { chatroomState } from "../../recoil/atoms/common";
import {
  chattingUserProfileImg,
  chattingRoomNumberState,
  chattingUserName,
} from "../../recoil/atoms/chatting";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface ChattingListItem {
  chatRoomId: number;
  isSecret: number;
  latestMessage: string;
  otherUserId: string;
  otherUserName: string;
  otherUserProfileImg: string;
}

export default function ChattingListModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  const [chatList, setChatList] = useState<ChattingListItem[]>([]);
  const [isChat, setIsChat] = useRecoilState<boolean>(chatroomState);
  const [userProfile, setChattingUserName] = useRecoilState<string>(
    chattingUserProfileImg
  );
  const [userName, setChattingUserProfileImg] =
    useRecoilState<string>(chattingUserName);
  const [chattingRoomNumber, setChattingRoomNumberState] =
    useRecoilState<number>(chattingRoomNumberState);

  useEffect(() => {
    getChattingList().then((data) => {
      setChatList(data.data.roomList);
    });
  }, []);

  return (
    <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 dark:bg-grayscale6">
      <header className="w-full h-10 bg-primary7 rounded-xl rounded-b-none p-2 text-grayscale1 dark:bg-primary4">
        <div className="relative w-[350px] h-[25px] ml-8 rounded-lg">
          <ClearIcon
            sx={{ color: "#FFFFFF", float: "right" }}
            onClick={onClickToggleModal}
          />
        </div>
      </header>
      <div className="p-2 dark:text-grayscale1">
        {chatList.map((item) => (
          <div
            key={item.chatRoomId}
            onClick={() =>
              handleChatRoomClick(
                item.chatRoomId,
                item.otherUserProfileImg,
                item.otherUserName
              )
            }
          >
            <img
              src={item.otherUserProfileImg}
              alt={item.otherUserName}
              width={50}
              height={50}
            />
            <div>{item.otherUserName}</div>
            {item.isSecret === 0 ? (
              <div>{item.latestMessage}</div>
            ) : (
              <div>비공개 메시지</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  function handleChatRoomClick(
    chatRoomId: number,
    otherUserProfileImg: string,
    otherUserName: string
  ) {
    setIsChat(false);
    setChattingUserProfileImg(otherUserProfileImg);
    setChattingRoomNumberState(chatRoomId);
    setChattingUserName(otherUserName);
  }
}
