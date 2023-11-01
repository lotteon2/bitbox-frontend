import { useEffect, useState } from "react";
import { getMemberBoard } from "../../apis/community/community";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../recoil/atoms/common";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  Empty,
  Pagination,
  PaginationProps,
  theme,
} from "antd";
import { useQuery } from "react-query";
import Loading from "../../pages/Loading";
import CategoryBadge from "../board/CategoryBadge";

interface boardResponse {
  boardContents: string;
  boardId: number;
  boardTitle: string;
  masterCategoryId: number;
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

export default function MyBoard() {
  const isDark = useRecoilValue(darkmodeState);
  const [pageCount, setPageCount] = useState(0); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [reviewList, setReviewList] = useState<boardListResponse>();
  const navigate = useNavigate();

  const handlerPageChange: PaginationProps["onChange"] = (page: any) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getMemberBoardList", currentPage],
    queryFn: () => getMemberBoard(currentPage - 1),
  });

  useEffect(() => {
    if (data) {
      setPageCount(data.totalPages);
      setReviewList(data);
    }
  }, [data]);

  if (isLoading || data === undefined || reviewList === undefined)
    return <Loading />;
  return (
    <div>
      <p className="text-2xl pb-5">게시글 관리</p>
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
                onClick={() =>
                  navigate(
                    item.masterCategoryId === 2
                      ? "/board/alumni/detail/"
                      : item.masterCategoryId === 3
                      ? "/board/community/detail/"
                      : "/board/review/detail" + item.boardId
                  )
                }
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
                total={pageCount * 10}
                onChange={handlerPageChange}
              />
            </ConfigProvider>
          </div>
        </div>
      )}
    </div>
  );
}
