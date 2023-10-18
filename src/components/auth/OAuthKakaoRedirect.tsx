import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";

import { accessToken } from "../../recoil/atoms/common";
import { authorityState } from "../../recoil/atoms/common";
import { loginState } from "../../recoil/atoms/common";
import { oauthKakao } from "../../apis/auth/oauthKakao";

export default function OAuthKakaoRedirect() {
  const [token, setToken] = useRecoilState<string>(accessToken);
  const [authority, setAuthority] = useRecoilState<string>(authorityState);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const url = new URL(window.location.href);
  const error: string | null = url.searchParams.get("error");
  const errorDescription: string | null =
    url.searchParams.get("error_description");
  const code: string | null = url.searchParams.get("code");

  if (!!error && !!errorDescription) {
    alert(errorDescription);
    // move to main page
  }

  const mutate = useMutation(["oauthKakao"], () => oauthKakao(code), {
    onSuccess: (data) => {
      console.log(data);
      /* TODO 토큰, 권한, 로그인 상태 변경 */
    },
    onError: (error) => alert("인증에 실패했습니다"),
  });

  useEffect(() => {
    mutate.mutate();
  }, []);

  return <div></div>;
}
