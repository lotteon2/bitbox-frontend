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

interface memberInfo {
  memberId: string;
  remainCredit: number;
  classId: number;
}

export default function OAuthKakaoRedirect() {
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const [memberInfo, setMemberInfo] = useRecoilState<memberInfo>(memberState);

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

      if (data.invited) {
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
