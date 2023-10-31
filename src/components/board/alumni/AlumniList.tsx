import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getBoardList,
  searchBoardList,
} from "../../../apis/community/community";
import {
  ConfigProvider,
  Pagination,
  theme,
  Empty,
  PaginationProps,
} from "antd";
import { useRecoilValue } from "recoil";
import { authorityState, darkmodeState } from "../../../recoil/atoms/common";
import Loading from "../../../pages/Loading";
import { useNavigate } from "react-router";
import CategoryBadge from "../CategoryBadge";

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

interface boardListResponse {
  content: boardResponse[];
  pageable: object;
  size: number;
  sort: object;
  totalElement: number;
  totalPages: number;
}

export default function AlumniList(categoryId: any) {
  const authority = useRecoilValue(authorityState);
  const isDark = useRecoilValue(darkmodeState);
  const [pageCount, setPageCount] = useState(0); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [reviewList, setReviewList] = useState<boardListResponse>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlerPageChange: PaginationProps["onChange"] = (page: any) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getAlumniBoardList", categoryId.categoryId],
    queryFn: () =>
      getBoardList("alumni", categoryId.categoryId, currentPage - 1, 10),
  });

  useEffect(() => {
    if (data) {
      setPageCount(data.totalPages);
      setReviewList(data);
    }
  }, [data, categoryId.categoryId]);

  const handleSearchList = () => {
    if (inputRef.current !== null) {
      searchMutation.mutate(inputRef.current.value);
    }
  };
  const searchMutation = useMutation(
    ["searchAlumniList"],
    (keyword: string) =>
      searchBoardList("alumni", categoryId.categoryId, keyword, 0, 10),
    {
      onSuccess: (data) => {
        setReviewList(data);
      },
      onError: () => alert("실패"),
    }
  );

  if (isLoading || data === undefined || reviewList === undefined)
    return <Loading />;

  return (
    <div className="w-full">
      <div className="flex flex-row gap-5">
        <div className="w-full flex flex-row align-center mt-[15px] w-[85%] h-12 border-2 border-grayscale3 rounded-xl mt-6 dark:border-grayscale1">
          <input
            className="w-[95%] h-full rounded-xl bg-transparent outline-none px-2"
            type="text"
            placeholder="🔍 검색어를 입력하세요"
            ref={inputRef}
          />
          <button
            className="w-20 bg-primary7 px-2 rounded-r-lg text-grayscale1 dark:bg-primary4"
            onClick={handleSearchList}
          >
            검색
          </button>
        </div>
        {authority === "GRADUATE" || authority === "TRAINEE" ? (
          <button
            className="bg-primary7 w-28 my-4 py-2 rounded-md text-center text-xl text-white font-normal ml-auto dark:bg-primary4"
            onClick={() => navigate("/board/register/" + 2)}
          >
            글쓰기 🖍
          </button>
        ) : (
          <div className="w-28 my-4 py-2 rounded-md text-center text-xl font-normal text-white ml-auto dark:text-black">
            　
          </div>
        )}
      </div>

      {reviewList?.content.length === 0 ? (
        <div className="py-20">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
          <p className="text-center text-grayscale4">
            등록된 게시글이 없습니다.
          </p>
        </div>
      ) : (
        <div>
          {reviewList?.content.map((item: boardResponse) => {
            return (
              <div
                key={item.boardId}
                className="w-full border-2 border-grayscale3 rounded-xl px-10 py-5 cursor-pointer hover:shadow-lg"
                onClick={() => navigate("/board/alumni/detail/" + item.boardId)}
              >
                <div>
                  <CategoryBadge
                    categoryId={item.categoryId}
                    categoryName={item.categoryName.split(" ")[1]}
                  />
                </div>
                <br />
                <p className="font-bold text-xl">{item.boardTitle}</p>
                <br />
                <div
                  className=" w-[80%] h-[50px] overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.boardContents }}
                ></div>
                <p>...</p>
              </div>
            );
          })}
          <div className="flex justify-center mt-10">
            <ConfigProvider
              theme={{
                algorithm: isDark
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
                token: {
                  colorPrimary: isDark ? "#" : "#F92525",
                },
              }}
            >
              <Pagination
                defaultCurrent={currentPage}
                total={pageCount}
                onChange={handlerPageChange}
              />
            </ConfigProvider>
          </div>
        </div>
      )}
    </div>
  );
}
