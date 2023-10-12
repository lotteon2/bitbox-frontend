import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "./CalendarToolbar";
import "../../css/react-big-calendar.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { Toast } from "../common/Toast";

export default function AttendanceCalendar() {
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState({
    year: 2023,
    month: new Date().getMonth(),
  });
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const events = [
    {
      id: 1,
      title: "출석",
      start: new Date(2023, 8, 26),
      end: new Date(2023, 8, 26),
    },
    {
      id: 2,
      title: "결석",
      start: new Date(2023, 8, 25),
      end: new Date(2023, 8, 25),
    },
    {
      id: 3,
      title: "지각",
      start: new Date(2023, 8, 22),
      end: new Date(2023, 8, 22),
    },
    {
      id: 4,
      title: "조퇴",
      start: new Date(2023, 8, 21),
      end: new Date(2023, 8, 21),
    },
  ];

  const handleClickNavigate = (date: Date) => {
    setDate({ year: date.getFullYear(), month: date.getMonth() + 1 });
    setClick((prev) => !prev);
  };

  const handleClickSelect = (select: any) => {
    const year = select.start.getFullYear();
    const month = select.start.getMonth();
    const day = select.start.getDate();

    console.log(year, month, day, date, click);
    if (select.title !== "출석") {
      showModal();
    }
  };
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (title === "" || content === "") {
      Toast.fire({
        iconHtml:
          '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
        title: "제목/내용은 필수 입력값입니다",
        background: isDark ? "#4D4D4D" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      });
    } else {
      setIsModalOpen(false);
      Toast.fire({
        iconHtml:
          '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
        title: "제출되었습니다",
        background: isDark ? "#4D4D4D" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          onSelectEvent={handleClickSelect}
          eventPropGetter={eventHandlePropGetter}
        />
      </div>
      <Modal
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
      </Modal>
    </>
  );
}
