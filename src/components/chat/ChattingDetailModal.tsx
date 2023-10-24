import React, { PropsWithChildren, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSetRecoilState } from "recoil";
import { chatroomState } from "../../recoil/atoms/common";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

var stompClient: any = null;

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function ChattingDetailModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  const setIsChat = useSetRecoilState(chatroomState);

  const handleChatState = () => {
    setIsChat((cur: boolean) => !cur);
  };

  function connect() {
    var socket = new SockJS("http://localhost:8000/chatting-service/chattings");
    stompClient = Stomp.over(socket);

    console.log("소켓 연결 시도");

    let headers = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      withCredentials: "include",
    };

    stompClient.connect(headers, (frame: any) => {
      frame.connected = true;
      console.log("연결 성공", frame);
    });
    // stompClient.subscribe("/room/" + 1, function (chattingMessage: any) {
    //   console.log(chattingMessage);
    //   showChat(JSON.parse(chattingMessage.body));
    // });
  }

  // function showChat(chattingMessage: any) {
  //   stompClient.send("/send/" + 1, {});
  // }

  useEffect(() => {
    connect();
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
