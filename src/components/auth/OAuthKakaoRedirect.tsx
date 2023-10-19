import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";

import { authorityState } from "../../recoil/atoms/common";
import { loginState } from "../../recoil/atoms/common";
import { oauthKakao } from "../../apis/auth/oauthKakao";
import { useNavigate } from "react-router-dom";

export default function OAuthKakaoRedirect() {
  const [authority, setAuthority] = useRecoilState<string>(authorityState);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const url = new URL(window.location.href);
  const error: string | null = url.searchParams.get("error");
  const errorDescription: string | null =
    url.searchParams.get("error_description");
  const code: string | null = url.searchParams.get("code");

  const navigate = useNavigate();

  if (!!error && !!errorDescription) {
    alert(errorDescription); // TODO : swal
    navigate("/login");
  }

  const mutate = useMutation(["oauthKakao"], () => oauthKakao(code), {
    onSuccess: (data) => {
      setIsLogin(true);
      setAuthority(data["authority"]);
      localStorage.setItem("accessToken", data["accessToken"]);
      navigate("/");
    },
    onError: (error) => {
      alert("인증에 실패했습니다"); // TODO : swal
      navigate("/login");
    },
  });

  // TODO : mutate 왜 안되지
  useEffect(() => {
    mutate.mutate();
  }, []);

  return <div></div>;
}
