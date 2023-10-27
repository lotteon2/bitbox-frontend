import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { getBoardList, getCategoryList } from "../../apis/community/community";
import Loading from "../../pages/Loading";
import { Empty } from "antd";

interface categories {
  categoryId: number;
  categoryName: string;
}
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
export default function MainDevLog() {
  const [category, setCategory] = useState<number>(0);
  const [boardList, setBoardList] = useState<boardListResponse | null>();
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => getCategoryList(1),
  });

  const handleCategory = (categoryId: number) => {
    setCategory(categoryId);
    getBoardListMutation.mutate(categoryId);
  };

  const getBoardListMutation = useMutation(
    ["getBoardList", category],
    (categoryId: number) => getBoardList("devlog", categoryId, 0, 3),
    {
      onSuccess: (data) => {
        setBoardList(data);
      },
      onError: () => {},
    }
  );

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
    <div className="my-28 dark:text-grayscale1">
      <p className="text-3xl mb-5">데브로그</p>
      <p className="text-xl">
        2022년부터 시작된 교육을 통해 멋진 구성원들과 함꼐 모두가 성장할 수 있는
        프로젝트를 진행하고 있습니다.
      </p>
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
                </div>
              </div>
            );
          })
        )}
        <button className="absolute right-72 mt-[-150px] border-2 border-primary7 px-10 py-3 text-primary7 rounded-full hover:bg-primary7 hover:border-primary7 hover:text-grayscale1 dark:hover:bg-primary4 dark:hover:border-primary4">
          더 자세히 보러가기
        </button>
      </div>
    </div>
  );
}
