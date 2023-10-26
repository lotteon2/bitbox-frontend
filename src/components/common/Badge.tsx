export default function Badge(authority: any) {
  return (
    <button
      className={
        authority.authority === "ADMIN"
          ? "bg-secondary1 w-16 h-8 rounded-lg text-grayscale1"
          : authority.authority === "MANAGER"
          ? "bg-[#764747] w-16 h-8 rounded-lg text-grayscale1"
          : authority.authority === "TEACHER"
          ? "bg-[#3056D3] w-16 h-8 rounded-lg text-grayscale1"
          : authority.authority === "GRADUATE"
          ? "bg-primary5 w-16 h-8 rounded-lg text-grayscale1"
          : authority.authority === "TRAINEE"
          ? "bg-[#9463D3] w-16 h-8 rounded-lg text-grayscale1"
          : "bg-[#FFBE55] w-16 h-8 rounded-lg text-grayscale1"
      }
    >
      {authority.authority === "ADMIN"
        ? "관리자"
        : authority.authority === "MANAGER"
        ? "매니저"
        : authority.authority === "TEACHER"
        ? "강사"
        : authority.authority === "GRADUATE"
        ? "수료생"
        : authority.authority === "TRAINEE"
        ? "교육생"
        : "준비생"}
    </button>
  );
}
