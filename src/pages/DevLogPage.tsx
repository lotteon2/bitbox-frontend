import { useRecoilValue } from "recoil";
import DevLogList from "../components/board/devlog/DevLogList";
import { useNavigate } from "react-router-dom";
import { authorityState } from "../recoil/atoms/common";

export default function DevLogPage() {
  const authority = useRecoilValue<string>(authorityState);
  const navigate = useNavigate();

  return (
    <div>
      <p className="font-extrabold text-4xl">데브로그</p>
      <div className="flex justify-end mx-10">
        {authority === "ADMIN" ||
        authority === "MANAGER" ||
        authority === "TEACHER" ? (
          <button
            className="bg-primary7 px-5 py-2 rounded-lg text-grayscale1 dark:bg-primary4 hover:bg-primary5 dark:hover:bg-primary5"
            onClick={() => navigate("/board/devlog/register")}
          >
            글쓰기
          </button>
        ) : (
          ""
        )}
      </div>
      <DevLogList />
    </div>
  );
}
