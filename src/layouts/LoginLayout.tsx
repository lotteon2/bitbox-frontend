import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { darkmodeState, loginState } from "../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function LoginLayout() {
  const isDark = useRecoilValue(darkmodeState);
  // const isLogin = useRecoilValue(loginState);
  
  return (
    <div
      className={
        isDark
          ? "bg-grayscale7 w-screen h-screen m-auto dark relative"
          : "bg-grayscale1 w-full h-[100%] m-auto relative"
      }
    >
      <Header />
      <div className="w-full m-auto font-regular">
        <Outlet />
      </div>
    </div>
  );
}
