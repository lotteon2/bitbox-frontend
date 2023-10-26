import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useMutation } from "react-query";

import {
  authorityState,
  loginState,
  memberState,
} from "../../recoil/atoms/common";
import { oauthKakao } from "../../apis/auth/oauthKakao";
import { useNavigate } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getConnectionList } from "../../apis/chatting/chatting";
import {
  chattingClient,
  chattingCountState,
  chattingRoomListState,
} from "../../recoil/atoms/chatting";
import { getMyInfo } from "../../apis/member/member";

interface memberInfo {
  memberId: string;
  remainCredit: number;
  classId: number;
}

interface subscribe {
  roomId: number;
}

interface listState {
  roomId: number;
  chattingMessage: object;
}

interface chattingCreationInfo {
  chatRoomId: number;
  guestId: string;
  hostId: string;
}

export default function OAuthKakaoRedirect() {
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const [memberInfo, setMemberInfo] = useRecoilState<memberInfo>(memberState);
  const setChattingCount = useSetRecoilState<number>(chattingCountState);
  const setChatList = useSetRecoilState<listState[]>(chattingRoomListState);
  const setChattingClient = useSetRecoilState(chattingClient);

  const url = new URL(window.location.href);
  const error: string | null = url.searchParams.get("error");
  const errorDescription: string | null =
    url.searchParams.get("error_description");
  const code: string | null = url.searchParams.get("code");

  const navigate = useNavigate();

  var stompClient: any = null;

  if (!!error && !!errorDescription) {
    alert(errorDescription); // TODO : swal
    navigate("/login");
  }

  function handleMessageEvent(roomId: number, chatMessage: any) {
    console.log(roomId);
    console.log(chatMessage.body);
    /*
      1. 내가 현재 목록을 보고 있으면 리플레시
      2. 내가 상세를 보고 있는 경우
        -> 만약 내 채팅방 번호하고 일치한다면 대화창 추가한다
        (단 대화창을 추가하는데 transmitterId랑 내가 같으면 메시지를 공개하고 
          transmitterId랑 같지 않은데 hasSubscription이 존재하면 메시지를 공개하고
          그외에는 비밀 메시지다)
        -> 그렇지 않으면 chatMessage+1(밑에 안읽은 메시지 수)

    */
  }

  const mutate = useMutation(["oauthKakao"], () => oauthKakao(code), {
    onSuccess: (data) => {
      setIsLogin(true);
      setAuthority(data["authority"]);
      localStorage.setItem("accessToken", data["accessToken"]);
      localStorage.setItem("sessionToken", data["sessionToken"]);

      myInfo.mutate();

      if (data.isInvited) {
        alert(
          "교육생으로 등록된 경우 이름 추가 기입이 필요합니다. 마이페이지로 이동합니다."
        );
        setMemberInfo({
          ...memberInfo,
          classId: data.classId,
        });
        navigate("/mypage");
      } else {
        navigate("/");
      }
    },
    onError: (error: any) => {
      alert(error.response.data.message); // TODO : swal
      console.log(error);
      navigate("/login");
    },
  });

  const myInfo = useMutation(["getMyInfo"], () => getMyInfo(), {
    onSuccess: (user) => {
      let socket = new SockJS(
        "http://localhost:8000/chatting-service/chattings?sessionToken=" +
          localStorage.getItem("sessionToken")
      );
      stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame: any) => {
        getConnectionList().then((data) => {
          stompClient.subscribe("/room/0", function (creationEvent: any) {
            const roomCreationObject: chattingCreationInfo = JSON.parse(
              creationEvent.body
            );

            if (
              roomCreationObject.guestId == user.memberId ||
              roomCreationObject.hostId == user.memberId
            ) {
              // 내가 현재 목록을 보고 있으면 목록 새로고침 해야함
              stompClient.subscribe(
                "/room/" + roomCreationObject.chatRoomId,
                function (chatMessage: any) {
                  handleMessageEvent(
                    roomCreationObject.chatRoomId,
                    chatMessage
                  );
                }
              );
            }
          });

          data.data.rooms.forEach((item: subscribe) => {
            stompClient.subscribe(
              "/room/" + item.roomId,
              function (chatMessage: any) {
                handleMessageEvent(item.roomId, chatMessage);
              }
            );
          });

          setChattingCount(data.data.unReadMessageCount);
          setChattingClient(Object.assign({}, stompClient));
        });
      });
    },
    onError: () => {},
  });

  useEffect(() => {
    mutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO : 스피너
  return <div></div>;
}
