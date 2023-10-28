import { useEffect } from "react";
import { loginState } from "../../recoil/atoms/common";
import { notiShowState } from "../../recoil/atoms/noti";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
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
  isRead: boolean;
}

export default function NotificationDropDown() {
  const isLogin = useRecoilValue<boolean>(loginState);
  const setNotiEvent = useSetRecoilState<boolean>(notiEventState);
  const [notiShow, setNotiShow] = useRecoilState<boolean>(notiShowState);
  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification-service/notifications/subscription?sessionToken=`;

  const navigate = useNavigate();

  const notifications = new Array<Notification>();

  useEffect(() => {
    if (notiShow) {
      console.log("get all notis");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogin) {
      let eventSource = new EventSource(
        subscribeUrl + localStorage.getItem("accessToken")
      );

      eventSource.onopen = () => {
        console.log("connected on open");
        eventSource.addEventListener("CONNECT", (event: any) => {
          console.log(event.data);
        });

        eventSource.addEventListener("ATTENDANCE", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });

        eventSource.addEventListener("SUBSCRIPTION", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });

        eventSource.addEventListener("COMMENT", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });
      };

      eventSource.onerror = () => {
        console.log("connected after error");
        eventSource.close();
        eventSource = new EventSource(
          subscribeUrl + localStorage.getItem("accessToken")
        );

        eventSource.addEventListener("CONNECT", (event: any) => {
          console.log(event.data);
        });

        eventSource.addEventListener("ATTENDANCE", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });

        eventSource.addEventListener("SUBSCRIPTION", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });

        eventSource.addEventListener("COMMENT", (event: any) => {
          setNotiEvent((cur) => !cur);
          console.log(event.data);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readNotiMutation = useMutation(
    ["readNoti"],
    (noti: Notification) => readNotification(noti.notificationId),
    {
      onSuccess: () => {
        setNotiShow((cur) => !cur);
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
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        console.log(error);
      },
    }
  );

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
      className="absolute top-20 right-60 w-72 h-[500px] z-20 
      rounded-md drop-shadow-md shadow-lg font-light bg-grayscale1 text-grayscale7 dark:bg-grayscale7 dark:text-grayscale1"
    >
      {notiList === undefined || notiList.length === 0 ? (
        <p>미확인 알림이 없습니다</p>
      ) : (
        <>
          {notiList.map((noti: Notification) =>
            noti.isRead ? (
              <div className="text-grayscale4">
                <span
                  onClick={() => {
                    readNoti(noti);
                    navigate(noti.notificationLink);
                  }}
                >
                  <p>${noti.notificationInfo}</p>
                  <button onClick={() => deleteNoti(noti.notificationId)}>
                    x
                  </button>
                </span>
              </div>
            ) : (
              <div>
                <span onClick={() => readNoti(noti)}>
                  <p>${noti.notificationInfo}</p>
                  <button onClick={() => deleteNoti(noti.notificationId)}>
                    x
                  </button>
                </span>
              </div>
            )
          )}
          <div className="float-right">
            <button onClick={() => readAllNoti()}>전체 읽음</button>
            <button onClick={() => deleteAllNoti()}>전체 삭제</button>
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
