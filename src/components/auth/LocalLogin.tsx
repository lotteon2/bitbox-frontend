import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorityState, loginState } from "../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import { localLogin } from "../../apis/auth/locallogin";
import { useMutation } from "react-query";

interface loginDto {
  email: string;
  password: string;
}

export default function LocalLogin() {
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const tryLogin = async (event: any) => {
    const loginDto = {
      email: email,
      password: password,
    };

    loginMutation.mutate(loginDto);
  };

  const loginMutation = useMutation(
    ["localLogin"],
    (loginDto: loginDto) => localLogin(loginDto),
    {
      onSuccess: (data) => {
        setIsLogin(true);
        setAuthority(data["authority"]);
        localStorage.setItem("accessToken", data["accessToken"]);
        // TODO : 채팅서버, 알림서버 연결 요청
        navigate("/");
      },
      onError: (error: any) => {
        alert(error.response.data.message); // TODO : swal
        console.log(error);
        navigate("/login");
      },
    }
  );

  return (
    <>
      <p className="pb-4 font-thin text-base dark:text-grayscale1">
        관리자 로그인
      </p>
      <div className="py-2">
        <label className="text-left dark:text-grayscale1">이메일</label>
        <input
          className="shadow appearance-none border rounded w-full"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="py-2">
        <label className="text-left dark:text-grayscale1">비밀번호</label>
        <input
          className="shadow appearance-none border rounded w-full"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className="py-2">
        <button
          className="w-full px-2 my-1 py-2 rounded text-grayscale1 bg-secondary1 dark:bg-secondary2"
          onClick={tryLogin}
        >
          로그인
        </button>
      </div>
    </>
  );
}
