import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";

import { authorityState } from "../../recoil/atoms/common";
import { loginState } from "../../recoil/atoms/common";
import { oauthKakao } from "../../apis/auth/oauthKakao";
import { useNavigate } from "react-router-dom";

export default function OAuthKakaoRedirect() {
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);

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

      if (data.authority === "TRAINEE") {
        alert(
          "교육생으로 등록된 경우 이름 추가 기입이 필요합니다. 마이페이지로 이동합니다."
        );
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
