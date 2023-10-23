import { useState } from "react";
import { darkmodeState } from "../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import Logo from "../assets/images/logo.png";
import LogoDark from "../assets/images/logo_dark.png";
import LoginBackground from "../assets/images/login_background_img.png";
import OAuthLogin from "../components/auth/OAuthLogin";
import LocalLogin from "../components/auth/LocalLogin";

export default function LoginPage() {
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const [oauth, setOauth] = useState(true);

  const reverse = () => {
    setOauth((oauth) => !oauth);
  };

  return (
    <div className="w-full relative">
      <div className="w-[50%] mx-auto pt-20 min-w-[400px]">
        <div
          className="px-32 py-16 border-[1px] rounded-md dark:bg-grayscale7 
        flex-col items-center text-center justify-center min-w-[400px]"
        >
          <div className="pb-8 flex items-center justify-center">
            {isDark ? (
              <img className="w-[60px]" src={LogoDark} alt="로고" />
            ) : (
              <img className="w-[60px]" src={Logo} alt="로고" />
            )}
          </div>
          <p className="pb-8 font-regular text-3xl dark:text-grayscale1">
            로그인
          </p>
          {oauth ? <OAuthLogin /> : <LocalLogin />}
          <div className="font-thin text-sm inline-block float-right dark:text-grayscale1">
            <button onClick={reverse}>
              {oauth ? `관리자 로그인` : `회원 로그인`}
            </button>
          </div>
        </div>
      </div>
      <img
        src={LoginBackground}
        alt="배경 그림"
        className="w-[80%] mx-auto mt-[-50px] max-w-[800px]"
      />
    </div>
  );
}
