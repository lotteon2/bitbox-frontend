import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authorityState,
  darkmodeState,
  loginState,
} from "../../recoil/atoms/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localLogin } from "../../apis/auth/locallogin";
import { useMutation } from "react-query";
import { ConfigProvider, Input, Form, theme } from "antd";

interface loginDto {
  email: string;
  password: string;
}

type FieldType = {
  username: string;
  password: string;
};

export default function LocalLogin() {
  const isDark = useRecoilValue(darkmodeState);
  const setAuthority = useSetRecoilState<string>(authorityState);
  const setIsLogin = useSetRecoilState<boolean>(loginState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const tryLogin = async () => {
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
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: "100%" }}
          className={isDark ? "dark" : "light"}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="이메일"
            name="username"
            rules={[{ required: true, message: "이메일을 입력해주세요" }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full dark:text-grayscale1"
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
          >
            <Input.Password
              value={password as string}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </ConfigProvider>

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
