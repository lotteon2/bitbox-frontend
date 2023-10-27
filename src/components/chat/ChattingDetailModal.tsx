import React, { PropsWithChildren, useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { chatroomState, darkmodeState } from "../../recoil/atoms/common";
import {
  chattingUserProfileImg,
  chattingRoomNumberState,
  chattingUserId,
  chattingUserName,
  chattingChangeState,
} from "../../recoil/atoms/chatting";
import { getChatting, payChatting } from "../../apis/chatting/chatting";
import Loading from "../common/Loading";
import { useMutation, useQuery } from "react-query";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { getMyInfo } from "../../apis/member/member";
import SockJS from "sockjs-client";
import { Client } from "stompjs";
import Stomp from "stompjs";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface chatting {
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
    stompClient?.disconnect(() => {});
    setIsChat((cur: boolean) => !cur);
  };
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const userProfile = useRecoilValue(chattingUserProfileImg);
  const userName = useRecoilValue<string>(chattingUserName);
  const chattingRoomNumber = useRecoilValue(chattingRoomNumberState);
  const chattingUser = useRecoilValue(chattingUserId);
  const [isChange, setIsChange] = useRecoilState<boolean>(chattingChangeState);
  const [stompClient, setStompClient] = useState<null | Client>(null);
  const [myInfoData, setMyInfoData] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["getChatting", chattingRoomNumber, isChange],
    queryFn: () => getChatting(chattingRoomNumber),
  });

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSecretMessageClick = (chatId: number, isScrect: boolean) => {
    if (!isScrect) return;

    Swal.fire({
      title: '<p style="text-align: center">크레딧을 사용하시겠습니까?</p>',
      text: "구독권 정보가 없어 메세지 확인을 위해 크레딧을 사용해야 합니다. 메세지당 1 크레딧이 차감됩니다.",
      iconHtml:
        '<a><img src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: isDark ? "#66B966" : "#00A400", // confrim 버튼 색깔 지정
      cancelButtonColor: isDark ? "#C6C6C6" : "#808080", // cancel 버튼 색깔 지정
      confirmButtonText: "사용하기", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
      background: isDark ? "#202027" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        messageClickMutation.mutate(chatId);
      } else {
        // 모달창에서 cancel 버튼을 눌렀다면
      }
    });
  };

  const messageClickMutation = useMutation(
    ["withdrawMember"],
    (chatId: number) => payChatting(chatId),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
      },
      onError: () => {
        alert("크레딧이 부족하거나 결제 서버에 연결 할 수 없습니다.");
      },
    }
  );

  const myInfo = useMutation(["getMyInfo"], () => getMyInfo(), {
    onSuccess: (user) => {
      setMyInfoData(user.memberId);
      let socket = new SockJS(
        "http://localhost:8000/chatting-service/chattings"
      );
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame: any) => {
        stompClient.subscribe(
          "/room/" + chattingRoomNumber,
          function (chatMessage: any) {
            const chatData = JSON.parse(chatMessage.body);

            let secret =
              chatData.hasSubscription ||
              chatData.transmitterId === user.memberId
                ? false
                : true;
            let location = chatData.transmitterId === user.memberId ? "R" : "L";
            let chatId = chatData.chatId;
            let msg = secret ? "" : chatData.message;

            const message = {
              location: location,
              message: msg,
              chatId: chatId,
              secret: secret,
            };

            console.log(message);
          }
        );
        setStompClient(stompClient);
      });
    },
    onError: () => {},
  });

  const sendMessage = () => {
    if (inputValue === "") {
      return;
    }

    setInputValue("");

    stompClient!.send(
      "/send/" + chattingRoomNumber,
      {},
      JSON.stringify({
        chatContent: inputValue,
        transmitterId: myInfoData,
        receiverId: chattingUser,
      })
    );
  };

  useEffect(() => {
    myInfo.mutate();
  }, []);

  if (data === undefined || isLoading) return <Loading />;

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
      <div className="flex flex-col h-[524px] gap-2 p-2 overflow-scroll dark:text-grayscale1">
        {data.data.map((item: chatting, index: number) => {
          return (
            <div
              key={index}
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
                onClick={() =>
                  handleSecretMessageClick(item.chatId, item.secret)
                }
              >
                {item.message === "" ? "비공개된 메세지입니다." : item.message}
              </span>
            </div>
          );
        })}
      </div>
      <footer className="flex flex-row">
        <input
          type="text"
          className="w-[90%] py-1 border-2 border-r-0 border-grayscale4 rounded-lg rounded-r-none dark:bg-grayscale6 dark:border-grayscale1"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="w-[10%] py-1 bg-primary7 dark:bg-primary4 rounded-lg rounded-l-none">
          <SendIcon sx={{ color: "#fff" }} onClick={sendMessage} />
        </button>
      </footer>
    </div>
  );
}
