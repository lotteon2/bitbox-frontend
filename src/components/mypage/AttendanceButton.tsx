import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Toast } from "../../components/common/Toast";
import { darkmodeState } from "../../recoil/atoms/common";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { memberEntrace, memberQuit } from "../../apis/member/member";
import { changeState } from "../../recoil/atoms/member";

interface currentLocationDto {
  lat: number;
  lng: number;
  current: string | null;
}

export default function AttendanceButton() {
  const now = new Date();
  const hours = String(now.getHours());
  const minutes = String(now.getMinutes());
  const seconds = String(now.getSeconds());
  const [current, setCurrent] = useState<string>(
    hours + ":" + minutes + ":" + seconds
  );
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const setIschange = useSetRecoilState<boolean>(changeState);

  useInterval(() => {
    // Your custom logic here
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    setCurrent(hours + ":" + minutes + ":" + seconds);
  }, 1000);

  const handleEntrance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location: currentLocationDto = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          current: null,
        };

        entraceMutation.mutate(location);
      });
    } else {
      alert("현재 위치 정보를 받아올 수 없습니다. 다시 시도해주세요");
    }
  };
  const handleQuit = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location: currentLocationDto = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          current: null,
        };

        quitMutation.mutate(location);
      });
    } else {
      alert("현재 위치 정보를 받아올 수 없습니다. 다시 시도해주세요");
    }
  };

  const handlePreventEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const entraceMutation = useMutation(
    ["memberEntrace"],
    (location: currentLocationDto) => memberEntrace(location),
    {
      onSuccess: () => {
        setIschange((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "입실되었습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
      onError: (error: any) => {
        console.log(error.response.data.message);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: error.response.data.message,
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
    }
  );

  const quitMutation = useMutation(
    ["memberQuit"],
    (location: currentLocationDto) => memberQuit(location),
    {
      onSuccess: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "퇴실되었습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
      onError: () => {},
    }
  );

  return (
    <div className="w-full border-2 border-grayscale2 py-4 flex flex-row dark:text-grayscale1">
      <span className="w-[300px] font-regular text-6xl ml-10 flex item-center">
        {current}
      </span>
      <div className="w-full flex flex-row flex-wrap gap-10 justify-end mr-10">
        <button
          className={
            Number(hours) >= 7 && Number(hours) <= 14
              ? "text-3xl w-[120px] h-16 bg-[#9463D3] rounded-lg text-grayscale1 hover:opacity-80"
              : "text-3xl w-[120px] h-16 bg-[#9463D3] opacity-20 rounded-lg text-grayscale1 cursor-default"
          }
          onClick={(e) => {
            Number(hours) >= 7 && Number(hours) <= 14
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
