import React, { PropsWithChildren, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { chatroomState } from "../../recoil/atoms/common";
import {
  chattingUserProfileImg,
  chattingRoomNumberState,
  chattingUserName,
  chattingRoomListState,
} from "../../recoil/atoms/chatting";
import { getChatting } from "../../apis/chatting/chatting";
import Loading from "../common/Loading";
import { useQuery } from "react-query";
import SendIcon from "@mui/icons-material/Send";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface ChattingListItem {
  location: string;
  message: string;
  chatId: number;
  secret: boolean;
}

export default function ChattingDetailModal({
  onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) {
  const setIsChat = useSetRecoilState(chatroomState);

  const handleChatState = () => {
    setIsChat((cur: boolean) => !cur);
  };

  const userProfile = useRecoilValue(chattingUserProfileImg);
  const userName = useRecoilValue<string>(chattingUserName);
  const chattingRoomNumber = useRecoilValue(chattingRoomNumberState);
  const chattingUser = useRecoilValue(chattingUserName);
  const [chattingList, setChattingRoomListState] = useState<ChattingListItem[]>(
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getChatting", chattingRoomNumber],
    queryFn: () => getChatting(chattingRoomNumber),
  });

  if (data === undefined || isLoading) return <Loading />;

  console.log(userProfile);
  return (
    <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 z-20 dark:bg-grayscale6">
      <header className="w-full h-10 bg-primary7 rounded-xl rounded-b-none p-2 text-grayscale1 dark:bg-primary4">
        <ChevronLeftIcon
          sx={{ color: "#FFFFFF", float: "left", zIndex: 10 }}
          onClick={handleChatState}
        />
        <div className="relative w-[350px] h-[25px] ml-8">
          <ClearIcon
            sx={{ color: "#FFFFFF", float: "right" }}
            onClick={onClickToggleModal}
          />
        </div>
      </header>
      <div className="flex flex-col h-[524px] gap-2 p-2 dark:text-grayscale1">
        {data.data.map((item: any) => {
          return (
            <div
              key={item.chatId}
              className={
                item.location === "L"
                  ? "flex justify-start"
                  : "flex justify-end"
              }
            >
              {item.location === "L" ? (
                <div className="flex flex-row gap-2">
                  <img
                    src={userProfile}
                    alt="프로필 이미지"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{userName}</span>
                </div>
              ) : (
                ""
              )}
              <span
                className={
                  item.location === "L"
                    ? "mt-6 ml-[-45px] max-w-[80%] py-1 px-2 rounded-lg bg-grayscale2 dark:bg-grayscale5"
                    : "max-w-[80%] py-1 px-2 rounded-lg bg-primary1 dark:bg-primary4"
                }
              >
                {item.secret ? "비공개된 메세지입니다." : item.message}
              </span>
            </div>
          );
        })}
      </div>
      <footer className="flex flex-row">
        <input
          type="text"
          className="w-[90%] py-1 border-2 border-r-0 border-grayscale4 rounded-lg rounded-r-none dark:bg-grayscale6 dark:border-grayscale1"
        />
        <button className="w-[10%] py-1 bg-primary7 dark:bg-primary4 rounded-lg rounded-l-none">
          <SendIcon sx={{ color: "#fff" }} />
        </button>
      </footer>
    </div>
  );
}
