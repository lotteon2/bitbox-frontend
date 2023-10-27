import { useState } from "react";
import { useQuery } from "react-query";
import { getBoardList } from "../../../apis/community/community";
import { getBoardDetail } from "../../../apis/community/community";
import { useMutation } from "react-query";
import { Modal } from "antd";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../../recoil/atoms/common";
import { useNavigate } from "react-router-dom";
import { authorityState } from "../../../recoil/atoms/common";
import Loading from "../../common/Loading";

export default function DevLogList() {
  const isDark = useRecoilValue(darkmodeState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const authority = useRecoilValue<string>(authorityState);

  const { data, isLoading } = useQuery({
    queryKey: ["getBoardList"],
    queryFn: () => getBoardList("devlog", 1),
  });

  const handleDevlogDetail = (boardId: number) => {
    setIsModalOpen(true);
    getBoardDetailMutation.mutate(boardId);
  };

  const getBoardDetailMutation = useMutation(
    ["getBoardDetail"],
    (boardId: number) => getBoardDetail("데브로그", boardId),
    {
      onSuccess: () => {
        setIsModalOpen(true);
        // TODO: 나중에 불러온 데이터 useState 변수에 넣어두기
      },
      onError: () => {},
    }
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading || data === undefined) return <Loading />;

  console.log(data);
  return (
    <div className="flex flex-row flex-wrap gap-5 mt-10">
      <div></div>
      <div className="w-[400px] h-[500px] bg-grayscale2 relative group">
        <img
          className="w-full h-full cursor-pointe"
          src="https://images.velog.io/images/young_pallete/post/91983ddb-182f-44ee-a9f2-c37ed4b391e6/%EC%BA%A1%EC%B2%98.PNG"
          alt=""
        />
        <div className="w-full h-full absolute top-0 p-10 bg-[#4D4D4D88] hidden group-hover:block">
          <p className="font-bold text-4xl text-grayscale1">Title</p>
          <p className="text-xl text-grayscale1 mt-5">Content</p>
          <button
            className="absolute bottom-10 bg-primary7 px-28 py-5 rounded-lg text-xl text-grayscale1 hover:bg-primary6 dark:bg-primary4 dark:hover:bg-primary5"
            onClick={() => handleDevlogDetail(1)} // 나중에 data.map 돌려서 나온 boardId로 바꿔주기
          >
            자세히 보기
          </button>
        </div>
      </div>
      {/* 나중에 mutation에서 저장한 값들로 바꿔주기 */}
      <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="dark:bg-grayscale7 dark:text-grayscale1 text-2xl font-bold">
            Title
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={""}
      >
        <div className="max-h-[500px] overflow-scroll">
          {authority === "ADMIN" ||
          authority === "MANAGER" ||
          authority === "TEACHER" ? (
            <div className="flex justify-end">
              <button
                className="font-regular bg-primary7 px-5 py-2 rounded-lg text-grayscale1 dark:bg-primary4 hover:bg-primary5 dark:hover:bg-primary5"
                onClick={() => navigate("/board/devlog/register")}
              >
                수정
              </button>
            </div>
          ) : (
            ""
          )}
          <img
            className="w-full h-[300px] mt-5"
            src="https://images.velog.io/images/young_pallete/post/91983ddb-182f-44ee-a9f2-c37ed4b391e6/%EC%BA%A1%EC%B2%98.PNG"
            alt=""
          />
          <p className="mt-5 text-lg dark:text-grayscale1">글 내용</p>
        </div>
      </Modal>
    </div>
  );
}
