import React from "react";
import NotFoundImg from "../assets/images/notfound.mp4";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <video muted autoPlay loop className="m-auto">
        <source src={NotFoundImg} type="video/mp4" />
      </video>
      <div className="w-full mt-[-100px] text-center flex flex-col">
        <p className="font-extrabold text-4xl">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="mt-5 font-regular">
          방문하시려는 페이지의 주소가 잘못 입력되었거나, 페이지의 주소가 변경
          혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="font-regular">
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>
        <NavLink
          to="/"
          className="w-40 m-auto py-4 px-2 rounded-full mt-10 bg-primary6 font-bold text-grayscale1 hover:bg-primary7"
        >
          메인으로 돌아가기
        </NavLink>
      </div>
    </div>
  );
}
