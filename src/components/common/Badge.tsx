import React from "react";
import { authorityState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function Badge(authority: any) {
  return (
    <button
      className={
        authority === "ADMIN"
          ? "bg-secondary1 w-16 h-8 rounded-lg text-grayscale1"
          : authority === "MANAGER"
          ? "bg-[#764747] w-16 h-8 rounded-lg text-grayscale1"
          : authority === "TEACHER"
          ? "bg-[#3056D3] w-16 h-8 rounded-lg text-grayscale1"
          : authority === "GRADUATE"
          ? "bg-primary5 w-16 h-8 rounded-lg text-grayscale1"
          : authority === "TRAINEE"
          ? "bg-[#9463D3] w-16 h-8 rounded-lg text-grayscale1"
          : "bg-[#FFBE55] w-16 h-8 rounded-lg text-grayscale1"
      }
    >
      {authority === "ADMIN"
        ? "관리자"
        : authority === "MANAGER"
        ? "매니저"
        : authority === "TEACHER"
        ? "강사"
        : authority === "GRADUATE"
        ? "수료생"
        : authority === "TRAINEE"
        ? "교육생"
        : "준비생"}
    </button>
  );
}
