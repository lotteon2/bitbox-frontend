import React, { useState } from "react";

export default function MainDevLog() {
  const [clickBtn, setClickBtn] = useState<number>(1);

  return (
    <div className="my-28 dark:text-grayscale1">
      <p className="text-3xl mb-5">데브로그</p>
      <p className="text-xl">
        2022년부터 시작된 교육을 통해 멋진 구성원들과 함꼐 모두가 성장할 수 있는
        프로젝트를 진행하고 있습니다.
      </p>
      <div className="mt-10 p-2 flex flex-row border-t-2 border-b-2 gap-10">
        <button
          className={
            clickBtn === 1
              ? "px-16 py-3 bg-primary7 text-grayscale1 rounded-full dark:bg-primary4"
              : "px-16 py-3 border-2 border-primary7 rounded-full dark:border-primary4 dark:text-grayscale1"
          }
          onClick={() => setClickBtn(1)}
        >
          1기
        </button>
        <button
          className={
            clickBtn === 2
              ? "px-16 py-3 bg-primary7 text-grayscale1 rounded-full dark:bg-primary4"
              : "px-16 py-3 border-2 border-primary7 rounded-full dark:border-primary4 dark:text-grayscale1"
          }
          onClick={() => setClickBtn(2)}
        >
          2기
        </button>
      </div>
      <div className="mt-5 w-[80%] min-w-[1000px] h-[600px] relative m-auto">
        <div className="w-full h-full bg-black text-white">
          여기 이미지 & 자세히 보기 클릭하면 해당 기수 정보 들고 가서 데브로그로
          리다이랙션
        </div>
        <button className="border-2 border-grayscale1 absolute bottom-4 right-4 px-10 py-3 text-grayscale1 rounded-full hover:bg-primary7 hover:border-primary7 dark:hover:bg-primary4 dark:hover:border-primary4">
          자세히 보기
        </button>
      </div>
    </div>
  );
}
