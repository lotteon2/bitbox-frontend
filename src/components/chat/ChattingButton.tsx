import React, { useCallback, useState } from "react";
import ChatIcon from "../../assets/images/chat.png";
import ChatDarkIcon from "../../assets/images/chat_dark.png";
import {
  darkmodeState,
  chatState,
  chatroomState,
} from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import ChattingDetailModal from "./ChattingDetailModal";
import ChattingListModal from "./ChattingListModal";
import Badge from "@mui/material/Badge";

export default function ChattingButton() {
  const isDark = useRecoilValue(darkmodeState);
  const isChatRoom = useRecoilValue(chatroomState);
  const [isChat, setIsChat] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsChat(!isChat);
  }, [isChat]);

  const handleChatModalOpen = () => {
    setIsChat((cur) => !cur);
  };

  return (
    <div className="relative">
      <div
        className="bg-primary7 rounded-full w-20 h-20 p-4 fixed bottom-5 right-32 dark:bg-primary4"
        onClick={handleChatModalOpen}
      >
        <Badge
          color="success"
          overlap="circular"
          badgeContent={100}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: 15,
              height: 30,
              width: 30,
              borderRadius: "50%",
              marginRight: "-10px",
              marginTop: "-15px",
            },
          }}
        >
          {isDark ? (
            <img src={ChatDarkIcon} alt="" />
          ) : (
            <img src={ChatIcon} alt="" />
          )}
        </Badge>
      </div>
      {isChat &&
        (isChatRoom ? (
          <ChattingListModal onClickToggleModal={onClickToggleModal}>
            {/*TODO: 아래 div에 채팅방 목록 구성*/}
            <div>목록</div>
          </ChattingListModal>
        ) : (
          <ChattingDetailModal onClickToggleModal={onClickToggleModal}>
            {/*TODO: 아래 div에 채팅방 상세 구성*/}
            <div>상세</div>
          </ChattingDetailModal>
        ))}
    </div>
  );
}