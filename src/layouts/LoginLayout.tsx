import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { darkmodeState } from "../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function LoginLayout() {
  const isDark = useRecoilValue(darkmodeState);

  return (
    <div
      className={
        isDark
          ? "bg-grayscale7 w-screen h-screen mx-auto dark relative"
          : "bg-grayscale1 w-full h-[100%] mx-auto relative"
      }
    >
      <Header />
      <div className="w-full h-full m-auto font-regular dark:bg-[#363740]">
        <Outlet />
      </div>
    </div>
  );
}
