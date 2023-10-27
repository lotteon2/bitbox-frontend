import { useQuery } from "react-query";
import BoardItem from "./BoardItem";
import { getBoardList } from "../../apis/community/community";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import BoardCategory from "./BoardCategory";

export default function BoardList(categoryId: any) {
  const { data, isLoading } = useQuery<BoardItem>({
    queryKey: ["getBoardList"],
    queryFn: () => getBoardList("community", categoryId.categoryId, 0, 10),
  });
  const navigate = useNavigate();

  if (data === undefined || isLoading) return <Loading />;

  return (
    <div>
      <div>
        <div className="h-0.5 my-5 bg-gray-300"></div>
        {data.content.map((post, postIndex) => (
          <div
            key={postIndex}
            onClick={() => navigate("/board/community/detail/" + post.boardId)}
          >
            <BoardCategory
              categoryId={post.categoryId}
              categoryName={post.categoryName}
            />
            <div className="border-2 p-2 my-4">
              <div className="text-lg font-medium m-2">{post.boardTitle}</div>
              <div
                className="text-lg font-light mx-2 h-10 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: post.boardContents }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
