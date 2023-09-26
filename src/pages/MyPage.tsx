import React from "react";
import MyProfile from "../components/mypage/MyProfile";
import AttendanceButton from "../components/mypage/AttendanceButton";
import AttendanceCalendar from "../components/mypage/AttendanceCalendar";
import MyCredit from "../components/mypage/MyCredit";
import MyBoard from "../components/mypage/MyBoard";
import MyScoreGraph from "../components/mypage/MyScoreGraph";
import { authorityState } from "../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function MyPage() {
  const authority = useRecoilValue<string>(authorityState);
  return (
    <div className="mt-10 flex flex-col gap-10">
      <p className="font-extrabold text-4xl">마이페이지</p>
      <MyProfile />
      {authority === "TRAINEE" ? (
        <>
          <div className="border-b-2 border-grayscale2"></div>
          <AttendanceButton />
          <div className="border-b-2 border-grayscale2"></div>
          <AttendanceCalendar />
          <div className="border-b-2 border-grayscale2"></div>
          <MyScoreGraph />
        </>
      ) : (
        ""
      )}
      <div className="border-b-2 border-grayscale2"></div>
      <MyCredit />
      <div className="border-b-2 border-grayscale2"></div>
      <MyBoard />
    </div>
  );
}
