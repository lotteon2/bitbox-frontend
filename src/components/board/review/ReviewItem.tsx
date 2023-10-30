import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import {
  getBoardDetail,
  registerComment,
} from "../../../apis/community/community";
import Loading from "../../../pages/Loading";
import Badge from "../../common/Badge";
import SmsIcon from "@mui/icons-material/Sms";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../../recoil/atoms/common";
import { Empty } from "antd";

interface commentRegisterRequestDto {
  boardId: number;
  commentContents: string;
  masterCommentId: number | null;
}

export default function ReviewItem() {
  const boardId = useParams();
  const isDark = useRecoilValue(darkmodeState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reInputRef = useRef<HTMLInputElement | null>(null);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  const handleCommentRegist = () => {
    if (inputRef.current !== null) {
      const requestDto = {
        boardId: Number(boardId.boardId),
        commentContents: inputRef.current.value,
        masterCommentId: null,
      };
      commentRegisterMutation.mutate(requestDto);
    }
  };

  const handleReCommentRegist = (commentId: number) => {
    if (reInputRef.current !== null) {
      const requestDto = {
        boardId: Number(boardId.boardId),
        commentContents: reInputRef.current.value,
        masterCommentId: commentId,
      };
      commentRegisterMutation.mutate(requestDto);
    }
  };

  const commentRegisterMutation = useMutation(
    ["registerComment"],
    (requestDto: commentRegisterRequestDto) => registerComment(requestDto),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
      },
      onError: () => alert("실패"),
    }
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getBoardDetail", isChange],
    queryFn: () => getBoardDetail("senior", Number(boardId.boardId)),
  });

  if (data === undefined || isLoading) return <Loading />;
  console.log(data);
  return (
    <div className="w-full h-full">
      <p className="text-grayscale4">
        선배들의 이야기 {" > " + data.boardResponse.categoryName}
      </p>
      <br />
      <br />
      <p className="font-bold text-4xl">{data.boardResponse.boardTitle}</p>
      <p className="text-grayscale4">
        {data.boardResponse.createdAt.split("T")[0]}
      </p>
      <br />
      <div className="flex flex-row gap-5">
        <img
          className="w-16 h-16 rounded-full"
          src={data.boardResponse.memberProfileImg}
          alt="프로필 이미지"
        />
        <span className="mt-4">
          <Badge authority={data.boardResponse.authority} />
        </span>
        <span className="mt-5">{data.boardResponse.memberName}</span>
      </div>
      <br />
      <p className="border-[1px] border-grayscale4"></p>
      <br />
      <div
        dangerouslySetInnerHTML={{ __html: data.boardResponse.boardContents }}
      ></div>
      <br />
      <p className="my-2 ">
        <SmsIcon sx={{ color: isDark ? "white" : "" }} />
        댓글
      </p>
      <p className="border-[1px] border-grayscale4"></p>
      <br />
      <div>
        <div className="flex flex-row w-full gap-2">
          <input
            className="outline-none bg-transparent py-2 px-4 border-[1px] border-grayscale4 rounded-lg w-11/12"
            type="text"
            placeholder="댓글을 남겨보세요"
            ref={inputRef}
          />
          <button
            className="w-1/12 bg-secondary1 text-white  rounded-lg dark:bg-secondary2"
            onClick={handleCommentRegist}
          >
            등록
          </button>
        </div>
        {data.commentList.length === 0 ? (
          <>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
            <p className="text-center text-grayscale4">
              등록된 댓글이 없습니다.
            </p>
          </>
        ) : (
          <div className="w-full my-4">
            {data.commentList.map((item: any) => {
              return (
                <div
                  key={item.commentId}
                  className={
                    item.masterCommentId === -1
                      ? "py-5 border-b-[1px] border-grayscale4"
                      : "py-5 border-b-[1px] border-grayscale4"
                  }
                >
                  <div className="flex flex-row gap-3" key={item.commentId}>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={item.memberProfileImage}
                      alt="프로필 이미지"
                    />
                    <div className="flex flex-row gap-2 py-2">
                      <span className="text-sm">{item.memberName}</span>
                      <span className="text-sm text-grayscale4">
                        {item.createdAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="px-12">{item.commentContents}</div>
                  <div className="pl-10 py-3 flex flex-row w-full gap-2">
                    <input
                      className="outline-none bg-transparent py-2 px-4 border-[1px] border-grayscale4 rounded-lg w-11/12"
                      type="text"
                      placeholder="답댓글을 남겨보세요"
                      ref={reInputRef}
                    />
                    <button
                      className="w-1/12 bg-secondary1 text-white  rounded-lg dark:bg-secondary2"
                      onClick={() => handleReCommentRegist(item.commentId)}
                    >
                      등록
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
