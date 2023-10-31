import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import {
  getBoardDetail,
  registerComment,
  removeComment,
} from "../../../apis/community/community";
import Loading from "../../../pages/Loading";
import Badge from "../../common/Badge";
import SmsIcon from "@mui/icons-material/Sms";
import { useRecoilValue } from "recoil";
import { darkmodeState, memberState } from "../../../recoil/atoms/common";
import { Empty } from "antd";
import { Toast } from "../../common/Toast";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../../../apis/member/member";

interface commentRegisterRequestDto {
  boardId: number;
  commentContents: string;
  masterCommentId: number | null;
}

export default function AlumniItem() {
  const boardId = useParams();
  const isDark = useRecoilValue(darkmodeState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reInputRef = useRef<any>([]);
  const [isChange, setIsChange] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const handleReCommentRegist = (commentId: number, index: number) => {
    if (reInputRef.current[index] !== null) {
      const requestDto = {
        boardId: Number(boardId.boardId),
        commentContents: reInputRef.current[index].value,
        masterCommentId: commentId,
      };
      reInputRef.current[index].value = "";
      commentRegisterMutation.mutate(requestDto);
    }
  };

  const commentRegisterMutation = useMutation(
    ["registerComment"],
    (requestDto: commentRegisterRequestDto) => registerComment(requestDto),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "등록되었습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });

        if (inputRef.current !== null) {
          inputRef.current.value = "";
        }
      },
      onError: () =>
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "댓글 작성 오류",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        }),
    }
  );

  const handleRemoveComment = (commentId: number) => {
    commentRemoveMutation.mutate(commentId);
  };

  const commentRemoveMutation = useMutation(
    ["removeAlumniComment"],
    (commentId: number) => removeComment(commentId),
    {
      onSuccess: () => {
        setIsChange((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "삭제되었습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
      onError: () =>
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "댓글 삭제 오류",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        }),
    }
  );
  const { data, isLoading } = useQuery({
    queryKey: ["getBoardDetail", isChange],
    queryFn: () => getBoardDetail("senior", Number(boardId.boardId)),
  });

  if (data === undefined || isLoading) return <Loading />;

  return (
    <div className="w-full h-full">
      <p className="text-grayscale4">
        알럼나이 {" > " + data.boardResponse.categoryName}
      </p>
      <br />
      <br />
      {data.management ? (
        <div className="flex flex-row justify-end gap-5">
          <button
            className="bg-grayscale5 text-grayscale1 py-2 px-4 rounded-lg dark:bg-grayscale4"
            onClick={() =>
              navigate("/board/modify/2/detail/" + boardId.boardId)
            }
          >
            수정
          </button>
        </div>
      ) : (
        ""
      )}
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
          <Badge authority={data.boardResponse.memberAuthority} />
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
            {data.commentList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="py-5 border-b-[1px] border-grayscale4"
                >
                  <div className="flex flex-row gap-3">
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
                      {data.boardResponse.memberId === item.memberId ? (
                        <p className="text-sm bg-primary1 px-2 text-primary4">
                          작성자
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    {item.management ? (
                      <button
                        className="text-sm text-primary7 dark:text-primary4"
                        onClick={() => handleRemoveComment(item.commentId)}
                      >
                        삭제
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="px-12">{item.commentContents}</div>
                  <div>
                    {item.commentList.map((comment: any, index: number) => {
                      return (
                        <div key={index} className=" my-3 pl-10">
                          <div
                            className="flex flex-row gap-3"
                            key={comment.commentId}
                          >
                            <img
                              className="w-8 h-8 rounded-full"
                              src={comment.memberProfileImage}
                              alt="프로필 이미지"
                            />
                            <div className="flex flex-row gap-2 py-2">
                              <span className="text-sm">
                                {comment.memberName}
                              </span>
                              <span className="text-sm text-grayscale4">
                                {comment.createdAt.split("T")[0]}
                              </span>
                              {data.boardResponse.memberId ===
                              comment.memberId ? (
                                <p className="text-sm bg-primary1 px-2 text-primary4">
                                  작성자
                                </p>
                              ) : (
                                ""
                              )}
                              {comment.management ? (
                                <button
                                  className="text-sm text-primary7 dark:text-primary4"
                                  onClick={() =>
                                    handleRemoveComment(comment.commentId)
                                  }
                                >
                                  삭제
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="px-12">{comment.commentContents}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pl-10 py-3 flex flex-row w-full gap-2">
                    <input
                      className="outline-none bg-transparent py-2 px-4 border-[1px] border-grayscale4 rounded-lg w-11/12"
                      type="text"
                      placeholder="답댓글을 남겨보세요"
                      ref={(element) => (reInputRef.current[index] = element)}
                    />
                    <button
                      className="w-1/12 bg-secondary1 text-white  rounded-lg dark:bg-secondary2"
                      onClick={() =>
                        handleReCommentRegist(item.commentId, index)
                      }
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
