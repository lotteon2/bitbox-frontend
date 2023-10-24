import MyProfile from "../components/mypage/MyProfile";
import AttendanceButton from "../components/mypage/AttendanceButton";
import AttendanceCalendar from "../components/mypage/AttendanceCalendar";
import MyCredit from "../components/mypage/MyCredit";
import MyBoard from "../components/mypage/MyBoard";
import MyScoreGraph from "../components/mypage/MyScoreGraph";
import { useQuery } from "react-query";
import { getMyInfo } from "../apis/member/member";

export default function MyPage() {
  // 내 정보 조회
  const { data, isLoading } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo(),
  });
  const authority = data?.memberAuthority;

  if (data === undefined || isLoading) return null;
  return (
    <div className="mt-10 flex flex-col gap-10">
      <p className="font-extrabold lg:text-4xl sm:text-sm">마이페이지</p>
      <MyProfile />
      {authority === "TRAINEE" ? (
        <>
          <div className="border-b-2 border-grayscale2"></div>
          <AttendanceButton />
          <div className="border-b-2 border-grayscale2"></div>
          <AttendanceCalendar />
          <div className="border-b-2 border-grayscale2"></div>
          <MyScoreGraph />
        </>
      ) : (
        ""
      )}
      <div className="border-b-2 border-grayscale2"></div>
      <MyCredit />
      <div className="border-b-2 border-grayscale2"></div>
      <MyBoard />
    </div>
  );
}
