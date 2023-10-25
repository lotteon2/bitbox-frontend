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
  children,
}: PropsWithChildren<ModalDefaultType>) {
  const setIsChat = useSetRecoilState(chatroomState);

  const handleChatState = () => {
    setIsChat((cur: boolean) => !cur);
  };

  const userProfile = useRecoilValue(chattingUserProfileImg);
  const chattingRoomNumber = useRecoilValue(chattingRoomNumberState);
  const chattingUser = useRecoilValue(chattingUserName);
  const [chattingList, setChattingRoomListState] = useState<ChattingListItem[]>(
    []
  );

  useEffect(() => {
    getChatting(chattingRoomNumber).then((data) => {
      setChattingRoomListState(data.data);
    });
  }, []);

  return (
    <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 dark:bg-grayscale6">
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
      <div className="p-2 dark:text-grayscale1">{children}</div>
    </div>
  );
}
