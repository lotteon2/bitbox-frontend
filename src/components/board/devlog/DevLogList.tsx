import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getBoardList,
  getCategoryList,
} from "../../../apis/community/community";
import { getBoardDetail } from "../../../apis/community/community";
import { useMutation } from "react-query";
import { Modal } from "antd";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../../recoil/atoms/common";
import { useNavigate } from "react-router-dom";
import { authorityState } from "../../../recoil/atoms/common";
import Loading from "../../common/Loading";
import { Empty } from "antd";

interface boardResponse {
  boardContents: string;
  boardId: number;
  boardTitle: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  deleted: boolean;
  memberId: string;
  memberName: string;
  thumbnail: string;
  updatedAt: string;
}
interface categories {
  categoryId: number;
  categoryName: string;
}
interface boardDetail {
  boardResponse: boardResponse;
  commentList: object[];
  management: boolean;
}
interface boardListResponse {
  content: boardResponse[];
  pageable: object;
  size: number;
  sort: object;
  totalElement: number;
  totalPages: number;
}
export default function DevLogList() {
  const [category, setCategory] = useState<number>(0);
  const isDark = useRecoilValue(darkmodeState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const authority = useRecoilValue<string>(authorityState);

  const [boardDetail, setBoardDetail] = useState<undefined | boardDetail>();
  const [boardList, setBoardList] = useState<boardListResponse | null>();

  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => getCategoryList(1),
  });

  const handleDevlogDetail = (boardId: number) => {
    setIsModalOpen(true);
    getBoardDetailMutation.mutate(boardId);
  };

  const getBoardDetailMutation = useMutation(
    ["getBoardDetail"],
    (boardId: number) => getBoardDetail("devlog", boardId, true),
    {
      onSuccess: (data) => {
        setIsModalOpen(true);
        setBoardDetail(data);
      },
      onError: () => {},
    }
  );

  const getBoardListMutation = useMutation(
    ["getBoardList"],
    (categoryId: number) => getBoardList("devlog", categoryId, 0, 100),
    {
      onSuccess: (data) => {
        setBoardList(data);
      },
      onError: () => {},
    }
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCategory = (categoryId: number) => {
    setCategory(categoryId);
    getBoardListMutation.mutate(categoryId);
  };

  useEffect(() => {
    if (data) {
      setCategory(data[0].categoryId);
      getBoardListMutation.mutate(data[0].categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading || data === undefined || boardList === undefined)
    return <Loading />;

  return (
    <>
      <div className="mt-10 p-2 flex flex-row border-t-2 border-b-2 gap-10">
        {data.map((item: categories, index: number) => {
          return (
            <button
              key={index}
              className={
                item.categoryId === category
                  ? "px-16 py-3 bg-primary7 text-grayscale1 rounded-full dark:bg-primary4"
                  : "px-16 py-3 border-2 border-primary7 rounded-full dark:border-primary4 dark:text-grayscale1"
              }
              onClick={() => handleCategory(item.categoryId)}
            >
              {item.categoryName}
            </button>
          );
        })}
      </div>
      <div className="flex flex-row flex-wrap gap-10 px-5">
        {boardList?.content.length === 0 ? (
          <div className="w-full mt-5">
            <span>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
              <p className="text-center text-grayscale4">
                등록된 게시글이 없습니다.
              </p>
            </span>
          </div>
        ) : (
          boardList?.content.map((item: boardResponse) => {
            return (
              <div
                key={item.boardId}
                className={
                  item.categoryId === category
                    ? "w-[400px] h-[500px] relative group mt-10"
                    : "hidden"
                }
              >
                <img
                  className="w-full h-full cursor-pointe"
                  src={item.thumbnail}
                  alt=""
                />
                <div className="w-full h-full absolute top-0 p-10 bg-[#4D4D4D88] hidden group-hover:block">
                  <p className="font-bold text-4xl text-grayscale1">
                    {item.boardTitle}
                  </p>
                  <div
                    className="text-xl text-grayscale1 mt-5 max-h-[200px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item.boardContents,
                    }}
                  ></div>
                  <p className="text-xl text-grayscale1 mt-3">...</p>
                  <button
                    className="absolute bottom-10 bg-primary7 px-28 py-5 rounded-lg text-xl text-grayscale1 hover:bg-primary6 dark:bg-primary4 dark:hover:bg-primary5"
                    onClick={() => handleDevlogDetail(item.boardId)} // 나중에 data.map 돌려서 나온 boardId로 바꿔주기
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="dark:bg-grayscale7 dark:text-grayscale1 text-2xl font-bold">
            {boardDetail?.boardResponse.boardTitle}
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
                onClick={() =>
                  navigate(
                    "/board/devlog/modify/" + boardDetail?.boardResponse.boardId
                  )
                }
              >
                수정
              </button>
            </div>
          ) : (
            ""
          )}
          <img
            className="w-full h-[300px] mt-5"
            src={boardDetail?.boardResponse.thumbnail}
            alt=""
          />
          <div
            className="mt-5 text-lg dark:text-grayscale1"
            dangerouslySetInnerHTML={{
              __html:
                boardDetail === undefined
                  ? ""
                  : boardDetail.boardResponse.boardContents,
            }}
          ></div>
        </div>
      </Modal>
    </>
  );
}
