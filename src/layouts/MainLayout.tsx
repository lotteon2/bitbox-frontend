import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ModeButton from "../components/common/ModeButton";
import ChattingButton from "../components/common/ChattingButton";
import {darkMode, loginState} from "../recoil/atoms/common";
import {useRecoilState, useRecoilValue} from "recoil";

function MainLayout() {
    const isDark = useRecoilValue(darkMode);
    const isLogin = useRecoilValue(loginState);
    return <div className={isDark ? "bg-grayscale7 w-full h-[100%] m-auto dark relative" : "bg-grayscale1 w-full h-[100%] m-auto relative"}>
        <Header />
        <div className="max-w-[1320px] m-auto font-regular">
            <Outlet />
            <Footer />
        </div>
            {isLogin ? <ChattingButton /> : <></>}
            <ModeButton />
    </div>;
}
export default MainLayout;