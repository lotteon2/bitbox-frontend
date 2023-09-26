import Badge from "../common/Badge";
import { memberState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";

interface member {
  memberId: number;
  remainCredit: number;
  classId: number;
}
export default function MyProfile() {
  const memberInfo = useRecoilValue<member>(memberState);
  return (
    <div className="relative">
      <div className="flex flex-row gap-20">
        <div className="flex flex-row gap-5">
          <div className="w-20 h-20 bg-black rounded-full"></div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 mt-3">
              <Badge />
              <div className="mt-1">사용자 이름</div>
            </div>
            <div className="text-grayscale5 mt-1">사용자 이메일</div>
          </div>
        </div>
        <div className="mt-5 text-2xl">
          <span className="text-primary7 dark:primary4">
            {memberInfo.remainCredit}
          </span>{" "}
          크레딧
        </div>
        <div className="flex flex-row gap-10 absolute right-0 top-4">
          <button className="bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5">
            정보수정
          </button>
          <button className="bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
