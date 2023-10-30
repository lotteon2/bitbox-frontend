import { useEffect, useState } from "react";
import { loginState } from "../../recoil/atoms/common";
import { notiChangedState, notiShowState } from "../../recoil/atoms/noti";
import { useRecoilValue, useRecoilState } from "recoil";
import { notiEventState } from "../../recoil/atoms/noti";

import {
  getAllNotifications,
  deleteNotification,
  deleteAllNotifications,
  readNotification,
  readAllNotifications,
} from "../../apis/noti/notification";
import { useMutation } from "react-query";

interface Notification {
  notificationId: number;
  notificationInfo: string;
  notificationLink: string;
  read: boolean;
}

export default function NotificationDropDown() {
  const isLogin = useRecoilValue<boolean>(loginState);
  const [notiEvent, setNotiEvent] = useRecoilState<boolean>(notiEventState);
  const [notiShow, setNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiChanged, setNotiChanged] =
    useRecoilState<boolean>(notiChangedState);

  const [notifications, setNotifications] = useState([]);

  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification-service/notifications/subscription?sessionToken=`;

  useEffect(() => {
    getAllNoti();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notiEvent, notiChanged]);

  useEffect(() => {
    if (isLogin) {
      let eventSource = new EventSource(
        subscribeUrl + localStorage.getItem("accessToken")
      );

      eventSource.onopen = () => {
        eventSource.addEventListener("ATTENDANCE", (event: any) => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SUBSCRIPTION", (event: any) => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("COMMENT", (event: any) => {
          setNotiEvent((cur) => !cur);
        });
      };

      eventSource.onerror = () => {
        eventSource.close();
        eventSource = new EventSource(
          subscribeUrl + localStorage.getItem("accessToken")
        );

        eventSource.addEventListener("ATTENDANCE", (event: any) => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SUBSCRIPTION", (event: any) => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("COMMENT", (event: any) => {
          setNotiEvent((cur) => !cur);
        });
      };

      getAllNoti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readNotiMutation = useMutation(
    ["readNoti"],
    (noti: Notification) => readNotification(noti.notificationId),
    {
      onSuccess: () => {
        setNotiShow((cur) => !cur);
        setNotiChanged((cur) => !cur);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        console.log(error);
      },
    }
  );

  const deleteNotiMutation = useMutation(
    ["deleteNoti"],
    (notiId: number) => deleteNotification(notiId),
    {
      onSuccess: () => {
        console.log("삭제 처리가 완료됐습니다");
        setNotiChanged((cur) => !cur);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        console.log(error);
      },
    }
  );

  const readAllNotiMutation = useMutation(
    ["readAllNoti"],
    () => readAllNotifications(),
    {
      onSuccess: () => {
        console.log("모든 읽음 처리가 완료됐습니다");
        setNotiChanged((cur) => !cur);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        console.log(error);
      },
    }
  );

  const deleteAllNotiMutation = useMutation(
    ["deleteAllNoti"],
    () => deleteAllNotifications(),
    {
      onSuccess: () => {
        console.log("모든 삭제 처리가 완료됐습니다");
        setNotiChanged((cur) => !cur);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        console.log(error);
      },
    }
  );

  const getAllNotiMutation = useMutation(
    ["getAllNotifications"],
    () => getAllNotifications(),
    {
      onSuccess: (data) => {
        setNotifications(data);
      },
      onError: () => alert("오류"),
    }
  );

  const getAllNoti = async () => {
    getAllNotiMutation.mutate();
  };

  const readNoti = async (noti: Notification) => {
    readNotiMutation.mutate(noti);
  };

  const deleteNoti = async (notiId: number) => {
    deleteNotiMutation.mutate(notiId);
  };

  const readAllNoti = async () => {
    readAllNotiMutation.mutate();
  };

  const deleteAllNoti = async () => {
    deleteAllNotiMutation.mutate();
  };

  return notiShow ? (
    <div
      className="absolute top-20 right-80 w-70 h-[500px] z-50 text-center
rounded-md drop-shadow-md shadow-lg font-light bg-grayscale1 text-grayscale7 dark:bg-grayscale7 dark:text-grayscale1"
    >
      {notifications === undefined || notifications.length === 0 ? (
        <div className="py-3">
          <p>미확인 알림이 없습니다</p>
        </div>
      ) : (
        <>
          <div className="h-[465px] overflow-scroll py-3 items-stretch">
            {notifications.map((noti: Notification) => (
              <div
                className={`flex border-b-[1px] border-solid ${
                  noti.read ? "text-grayscale4" : ""
                }`}
              >
                <div
                  className="gap-2 py-2"
                  onClick={() => {
                    readNoti(noti);
                  }}
                >
                  <a href={noti.notificationLink}>
                    <p>{noti.notificationInfo}</p>
                  </a>
                </div>
                <button
                  className="font-bold text-grayscale7"
                  onClick={() => deleteNoti(noti.notificationId)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="float-right text-grayscale5 text-bold">
            <button className="mr-2" onClick={() => readAllNoti()}>
              전체 읽음
            </button>
            <button onClick={() => deleteAllNoti()}>전체 삭제</button>
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
