import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Toast } from "../../components/common/Toast";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function AttendanceButton() {
  const now = new Date();
  const hours = String(now.getHours());
  const minutes = String(now.getMinutes());
  const seconds = String(now.getSeconds());
  const [current, setCurrent] = useState<string>(
    hours + ":" + minutes + ":" + seconds
  );
  const isDark = useRecoilValue<boolean>(darkmodeState);

  useInterval(() => {
    // Your custom logic here
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    setCurrent(hours + ":" + minutes + ":" + seconds);
  }, 1000);

  const handleEntrance = () => {
    Toast.fire({
      iconHtml:
        '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
      title: "입실되었습니다.",
      background: isDark ? "#4D4D4D" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    });
  };
  const handleQuit = () => {
    Toast.fire({
      iconHtml:
        '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
      title: "퇴실되었습니다.",
      background: isDark ? "#4D4D4D" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    });
  };
  const handlePreventEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full border-2 border-grayscale2 py-4 flex flex-row dark:text-grayscale1">
      <span className="w-[300px] font-regular text-6xl ml-10 flex item-center">
        {current}
      </span>
      <div className="w-full flex flex-row flex-wrap gap-10 justify-end mr-10">
        <button
          className={
            Number(hours) >= 7 && Number(hours) <= 13
              ? "text-3xl w-[120px] h-16 bg-[#9463D3] rounded-lg text-grayscale1 hover:opacity-80"
              : "text-3xl w-[120px] h-16 bg-[#9463D3] opacity-20 rounded-lg text-grayscale1 cursor-default"
          }
          onClick={(e) => {
            Number(hours) >= 7 && Number(hours) <= 13
              ? handleEntrance()
              : handlePreventEvent(e);
          }}
        >
          입실하기
        </button>
        <button
          className={
            Number(hours) >= 14 && Number(hours) <= 18
              ? "text-3xl w-32 h-16 bg-secondary1 rounded-lg text-grayscale1 hover:opacity-80"
              : "text-3xl w-32 h-16 bg-secondary1 opacity-20 rounded-lg text-grayscale1 cursor-default"
          }
          onClick={(e) => {
            Number(hours) >= 14 && Number(hours) <= 18
              ? handleQuit()
              : handlePreventEvent(e);
          }}
        >
          퇴실하기
        </button>
      </div>
    </div>
  );
}
