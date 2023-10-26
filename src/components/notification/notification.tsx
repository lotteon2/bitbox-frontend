import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface Notification {
  notificationId: number;
  notificationInfo: string;
  notificationLink: string;
}

export default function NotificationDropDown() {
  const isDark = useRecoilValue<boolean>(darkmodeState);

  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  return <></>;
}
