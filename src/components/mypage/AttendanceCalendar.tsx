import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "./CalendarToolbar";
import "../../css/react-big-calendar.css";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllMyAttendance } from "../../apis/member/member";
// import { Button, Modal } from "antd";
// import { darkmodeState } from "../../recoil/atoms/common";
// import { useRecoilValue } from "recoil";
// import { Toast } from "../common/Toast";

interface calendarEvents {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
interface attendanceResult {
  attendanceId: number;
  attendanceDate: string;
  entraceTime: string | null;
  quitTime: string | null;
  attendanceState: string;
  attendanceModifyReason: string | null;
}
export default function AttendanceCalendar() {
  // const isDark = useRecoilValue<boolean>(darkmodeState);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [title, setTitle] = useState<string>("");
  // const [content, setContent] = useState<string>("");
  const [date, setDate] = useState({
    year: 2023,
    month: new Date().getMonth(),
  });
  const [click, setClick] = useState(false);
  const [events, setEvents] = useState<calendarEvents[]>();

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const handleClickNavigate = (date: Date) => {
    setDate({ year: date.getFullYear(), month: date.getMonth() + 1 });
    setClick((prev) => !prev);
  };

  // 캘린더 내 이벤트 색상
  const eventHandlePropGetter = (event: any) => {
    const backgroundColor =
      event.title === "출석"
        ? "green"
        : event.title === "결석"
        ? "red"
        : event.title === "지각"
        ? "purple"
        : event.title === "조퇴"
        ? "orange"
        : "blue";
    return { style: { backgroundColor } };
  };

  // 출결 정보 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["getAllMyAttendance"],
    queryFn: () => getAllMyAttendance(),
  });
  // // Modal Open
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // // 사유서 제출
  // const handleOk = () => {
  //   if (title === "" || content === "") {
  //     Toast.fire({
  //       iconHtml:
  //         '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
  //       title: "제목/내용은 필수 입력값입니다",
  //       background: isDark ? "#4D4D4D" : "#FFFFFF",
  //       color: isDark ? "#FFFFFF" : "#212B36",
  //     });
  //   } else {
  //     setIsModalOpen(false);

  //     Toast.fire({
  //       iconHtml:
  //         '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
  //       title: "제출되었습니다",
  //       background: isDark ? "#4D4D4D" : "#FFFFFF",
  //       color: isDark ? "#FFFFFF" : "#212B36",
  //     });
  //   }
  // };

  // // 사유서 제출 취소
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // // 사유서 모달 Open
  // const handleClickSelect = (select: any) => {
  //   console.log(select);
  //   const year = select.start.getFullYear();
  //   const month = select.start.getMonth();
  //   const day = select.start.getDate();

  //   console.log(year, month, day, date, click);
  //   if (select.title !== "출석") {
  //     showModal();
  //   }
  // };

  useEffect(() => {
    if (data != null) {
      let attendanceTmp: calendarEvents[] = [];

      data.forEach(function (item: attendanceResult) {
        const year = Number(item.attendanceDate.split("-")[0]);
        const month = Number(item.attendanceDate.split("-")[1]) - 1;
        const day = Number(item.attendanceDate.split("-")[2]);
        attendanceTmp.push({
          id: item.attendanceId,
          title:
            item.attendanceState === "ATTENDNACE"
              ? "출석"
              : item.attendanceState === "ABSENT"
              ? "결석"
              : item.attendanceState === "TARDY"
              ? "지각"
              : "조퇴",
          start: new Date(year, month, day),
          end: new Date(year, month, day),
        });
      });
      setEvents(attendanceTmp);
    }
  }, [data]);

  if (isLoading || data === undefined || events === undefined) return null;

  return (
    <>
      <div>
        <p className="text-2xl pb-5">출결 관리</p>
        <Calendar
          localizer={localizer}
          defaultView="month"
          components={{ toolbar: CalendarToolbar }}
          style={{ height: 800 }}
          events={events}
          onNavigate={handleClickNavigate}
          // onSelectEvent={handleClickSelect}
          eventPropGetter={eventHandlePropGetter}
        />
      </div>
      {/* <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="font-bold text-2xl dark:bg-grayscale7 dark:text-grayscale1">
            사유서 작성
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            className="w-[150px] h-[40px] text-lg font-regular bg-grayscale4 text-grayscale1 border-none dark:bg-grayscale6 hover:text-grayscale1 hover:opacity-80"
            onClick={handleCancel}
          >
            취소
          </Button>,
          <Button
            key="save"
            className="w-[150px] h-[40px] text-lg font-regular bg-secondary1 text-grayscale1 border-none dark:bg-secondary2 hover:text-grayscale1 hover:opacity-80"
            onClick={handleOk}
          >
            제출
          </Button>,
        ]}
      >
        <div className="my-5">
          <div className="text-lg dark:text-grayscale1">사유서 제목</div>
          <input
            className="w-full py-2 pl-2 border-2 border-grayscale2 rounded-lg dark:border-grayscale5 dark:bg-grayscale7 dark:text-grayscale1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="text-lg mt-3 dark:text-grayscale1">사유서 내용</div>
          <textarea
            className="w-full h-[200px] pl-2 border-2 border-grayscale2 rounded-lg dark:border-grayscale5 dark:bg-grayscale7 dark:text-grayscale1"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input type="file" className="my-3 dark:text-grayscale1" />
        </div>
      </Modal> */}
    </>
  );
}
