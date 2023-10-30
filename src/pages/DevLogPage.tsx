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
            className="bg-red-500 w-28 my-4 py-2 rounded-md text-center text-xl text-white font-normal ml-auto dark:bg-primary4"
            onClick={() => navigate("/board/devlog/register")}
          >
            글쓰기 🖍
          </button>
        ) : (
          ""
        )}
      </div>
      <DevLogList />
    </div>
  );
}
