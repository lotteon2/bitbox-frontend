import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ModeButton from "../components/common/ModeButton";
import ChattingButton from "../components/chat/ChattingButton";
import {
  authorityState,
  darkmodeState,
  loginState,
} from "../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function MainLayout() {
  const isDark = useRecoilValue(darkmodeState);
  const isLogin = useRecoilValue(loginState);
  const authority = useRecoilValue(authorityState);

  return (
    <div
      className={
        isDark
          ? "bg-grayscale7 w-screen h-[100%] m-auto dark relative"
          : "bg-grayscale1 w-screen h-[100%] m-auto relative"
      }
    >
      <Header />
      <div className="max-w-[1320px] m-auto font-regular dark:text-grayscale1">
        <Outlet />
        <Footer />
      </div>
      {isLogin &&
      (authority === "GENERAL" ||
        authority === "TRAINEE" ||
        authority === "GRADUATE") ? (
        <ChattingButton />
      ) : (
        <></>
      )}
      <ModeButton />
    </div>
  );
}
