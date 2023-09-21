import React from "react";
import { useRecoilValue } from "recoil";
import { darkmodeState, loginState } from "../recoil/atoms/common";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import ChattingButton from "../components/chat/ChattingButton";
import ModeButton from "../components/common/ModeButton";
import BoardSideHeader from "../components/board/BoardSideHeader";

export default function BoardLayout() {
    const isDark = useRecoilValue(darkmodeState);
    const isLogin = useRecoilValue(loginState);
    return <div className={isDark ? "bg-grayscale7 w-full h-[100%] m-auto dark relative" : "bg-grayscale1 w-full h-[100%] m-auto relative"}>
        <Header />
        <div className="max-w-[1320px] m-auto font-regular">
            <div className="flex flex-row my-10">
                <div className="w-[230px] mr-10"><BoardSideHeader /></div>
                <Outlet />
            </div>
            <Footer />
        </div>
        {isLogin ? <ChattingButton /> : <></>}
        <ModeButton />
    </div>;
}