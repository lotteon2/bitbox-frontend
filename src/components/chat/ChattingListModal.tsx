import { PropsWithChildren, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useSetRecoilState } from "recoil";
import { getChattingList } from "../../apis/chatting/chatting";
import { chatroomState } from "../../recoil/atoms/common";
import {
  chattingUserProfileImg,
  chattingRoomNumberState,
  chattingUserName,
  chattingUserId,
  chattingRoomGuestId,
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
  guestId: string;
}

export default function ChattingListModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  const [chattingList, setChattingList] = useState<ChattingListItem[]>([]);
  const setIsChat = useSetRecoilState<boolean>(chatroomState);
  const setChattingUserName = useSetRecoilState<string>(chattingUserName);
  const setChattingRoomGuestId = useSetRecoilState<string>(chattingRoomGuestId);
  const setChattingUserId = useSetRecoilState<string>(chattingUserId);
  const setChattingUserProfileImg = useSetRecoilState<string>(
    chattingUserProfileImg
  );
  const setChattingRoomNumberState = useSetRecoilState<number>(
    chattingRoomNumberState
  );

  useEffect(() => {
    getChattingList().then((data) => {
      setChattingList(data.data.roomList);
    });
  }, []);

  return (
    <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 z-20 dark:bg-grayscale6">
      <header className="w-full h-10 bg-primary7 rounded-xl rounded-b-none p-2 text-grayscale1 dark:bg-primary4">
        <div className="relative w-[350px] h-[25px] ml-8 rounded-lg">
          <ClearIcon
            sx={{ color: "#FFFFFF", float: "right" }}
            onClick={onClickToggleModal}
          />
        </div>
      </header>
      <div className="h-[550px] overflow-scroll">
        {chattingList.map((item) => (
          <div
            key={item.chatRoomId}
            onClick={() =>
              handleChatRoomClick(
                item.chatRoomId,
                item.otherUserProfileImg,
                item.otherUserName,
                item.otherUserId,
                item.guestId
              )
            }
            className="p-4 border-b-[1px] dark:text-grayscale1 flex flex-row gap-3"
          >
            <img
              src={item.otherUserProfileImg}
              alt={item.otherUserName}
              className="w-14 h-14 rounded-full"
            />
            <div>
              <div className="font-bold">{item.otherUserName}</div>
              {item.isSecret === 0 ? (
                <div>{item.latestMessage}</div>
              ) : (
                <p className="w-[250px] h-[24px] whitespace-nowrap text-ellipsis overflow-hidden ...">
                  비공개된 메세지입니다.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleChatRoomClick(
    chatRoomId: number,
    otherUserProfileImg: string,
    otherUserName: string,
    otherUserId: string,
    guestId: string
  ) {
    setIsChat(false);
    setChattingUserProfileImg(otherUserProfileImg);
    setChattingRoomNumberState(chatRoomId);
    setChattingUserName(otherUserName);
    setChattingRoomGuestId(guestId);
    setChattingUserId(otherUserId);
  }
}
