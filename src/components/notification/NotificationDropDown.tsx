import { useState, useEffect } from "react";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { EventSourcePolyfill } from "event-source-polyfill";

interface Notification {
  notificationId: number;
  notificationInfo: string;
  notificationLink: string;
}

export default function NotificationDropDown() {
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const subscribeUrl = `${
    process.env.REACT_APP_API_URL
  }/notification-service/notifications/subscription?sessionToken=${localStorage.getItem(
    "sessionToken"
  )}`;
  const token = localStorage.getItem("accessToken");
  const [message, setMessage] = useState();

  useEffect(() => {
    if (token) {
      let eventSource = new EventSourcePolyfill(subscribeUrl, {
        headers: {
          "Content-Type": "text/event-stream",
          Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout: 60000,
        withCredentials: true,
      });
      eventSource.onerror = function () {
        eventSource.close();
        eventSource = new EventSourcePolyfill(subscribeUrl, {
          headers: {
            "Content-Type": "text/event-stream",
            Authorization: `Bearer ${token}`,
          },
          heartbeatTimeout: 60000,
          withCredentials: true,
        });
        eventSource.addEventListener("CONNECT", function (event) {
          console.log(event);
        });
      };
    }
  }, []);
  return (
    <div className="absolute top-20 right-60 w-72 h-[500px] bg-grayscale1 shadow-lg z-20">
      알람 리스트
    </div>
  );
}
