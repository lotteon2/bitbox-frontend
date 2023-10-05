import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "./CalendarToolbar";
import "../../css/react-big-calendar.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";

export default function AttendanceCalendar() {
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const [date, setDate] = useState({
    year: 2023,
    month: new Date().getMonth(),
  });
  const [click, setClick] = useState(false);

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
      Swal.fire({
        title: "사유서 제출",
        html: '<br><div class="swal2-label">사유서 제목</div><input id="swal2-input" class="swal2-input"/><br><br><div class="swal2-label">사유서 내용</div><textarea id="swal2-textarea" class="swal2-textarea"></textarea><input type="file" class="swal2-file" style="display: block"/>',
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: isDark ? "#FF8888" : "#DC2626", // confrim 버튼 색깔 지정
        cancelButtonColor: isDark ? "#C6C6C6" : "#808080", // cancel 버튼 색깔 지정
        confirmButtonText: "제출하기", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
        reverseButtons: true, // 버튼 순서 거꾸로
        background: isDark ? "#202027" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 모달창에서 confirm 버튼을 눌렀다면
        } else {
          // 모달창에서 cancel 버튼을 눌렀다면
        }
      });
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

  return (
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
  );
}
