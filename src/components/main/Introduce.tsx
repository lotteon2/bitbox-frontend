import React, {useEffect} from "react";
import Main01 from "../../assets/images/main/main01.png";
import Main01Dark from "../../assets/images/main/main01_dark.png";
import Main02 from "../../assets/images/main/main02.png";
import {darkMode} from "../../recoil/atoms/common";
import {useRecoilValue} from "recoil";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Introduce() {
    const isDark = useRecoilValue(darkMode);

    useEffect(() => {
        AOS.init();
    }, []);

    return <div className="w-full flex flex-col gap-10">
        <div className="flex flex-row flex-wrap">
            <div className="w-[620px] mx-auto mt-12" data-aos="fade-right" data-aos-duration="1000">
                <p className="text-3xl text-center dark:text-grayscale1">BITBOX는 '<b className="text-primary7 dark:text-primary4">롯데e커머스 교육</b>' 희망자 & 교육생 & 수료생들을 위한 커뮤니티입니다.</p>
            </div>
            <div className="w-[660px] m-auto" data-aos="fade-left" data-aos-duration="1000">
                <img className="w-full" src={isDark ? Main01Dark : Main01} alt="메인이미지01"/>
            </div>
        </div>
        <div className="flex flex-row  flex-wrap" data-aos="fade-right" data-aos-duration="1000" data-aos-offset="700">
            <div className="w-[660px] m-auto">
                <img className="w-full" src={Main02} alt="메인이미지02"/>
            </div>
            <div className="w-[660px] m-auto" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="700">
                <p className="text-3xl text-center dark:text-grayscale1">1:1 채팅을 통해 궁금했던 사항들을 질문해보세요!!</p>
            </div>
        </div>
    </div>
}