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
  chattingCountState,
  chattingRoomListState,
} from "../../recoil/atoms/chatting";

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

export default function OAuthKakaoRedirect() {
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const [memberInfo, setMemberInfo] = useRecoilState<memberInfo>(memberState);
  const setChattingCount = useSetRecoilState<number>(chattingCountState);
  const setChatList = useSetRecoilState<listState[]>(chattingRoomListState);

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

  const mutate = useMutation(["oauthKakao"], () => oauthKakao(code), {
    onSuccess: (data) => {
      setIsLogin(true);
      setAuthority(data["authority"]);
      localStorage.setItem("accessToken", data["accessToken"]);
      localStorage.setItem("sessionToken", data["sessionToken"]);

      let socket = new SockJS(
        "http://localhost:8000/chatting-service/chattings?sessionToken=" +
          localStorage.getItem("sessionToken")
      );

      stompClient = Stomp.over(socket);

      // TODO 비동기
      stompClient.connect({}, (frame: any) => {
        getConnectionList().then((data) => {
          stompClient.subscribe("/room/0", function (chatMessage: any) {
            console.log(chatMessage.body);
            /*
              if(guestId거나 hostId라면 해당 chatRoom을 구독한다){
                stompClient.subscribe
              }

              아니 근데 위에서 한 구독을 아래에서 체크하는 구조인데? 이게 됨??
            */
          });

          // stompClient.subscribe("/room/23", function (chatMessage: any) {
          //   console.log(chatMessage);
          // });

          // stompClient.send(
          //   "/send/22",
          //   {},
          //   JSON.stringify({
          //     chatContent: "hello csh",
          //     transmitterId: "sibal22",
          //     receiverId: "78cc4e3a-df3d-4cf5-a4cd-a7523c16206a",
          //   })
          // );

          data.data.rooms.forEach((item: subscribe) => {
            stompClient.subscribe(
              "/room/" + item.roomId,
              function (chatMessage: any) {
                console.log(chatMessage.body);
                /*
                  let commonAction = "내가 채팅 목록을 보고 있는데"
                  

                  if(commonAction && 내가 구독하는 채팅방에서 알림이 오면){
                    목록을 새로고침한다(API를 호출)
                  }
                  if(commonAction && 채팅방 생성 이벤트에서 알림이 오면 ){
                    목록을 새로고침 한다(API를 호출)
                  }



                */
              }
            );
          });

          setChattingCount(data.data.unReadMessageCount);
        });
      });

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

  useEffect(() => {
    mutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO : 스피너
  return <div></div>;
}
