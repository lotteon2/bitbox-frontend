import { async } from "q";
import { authInstance } from "../utils";

/**
 * 게시글 리스트 조회
 * @param boardType
 * @param categoryId
 */
export const getBoardList = async (boardType: string, categoryId: number) => {
  const { data } = await authInstance.get(
    "/board-service/board/" + boardType + "?categoryId=" + categoryId
  );
  return data;
};

/**
 * 카테고리 리스트 조회
 * @param categoryId: 상위 카테고리 아이디
 */
export const getCategoryList = async (categoryId: number) => {
  const { data } = await authInstance.get(
    "/board-service/board/categoryId=" + categoryId
  );
  return data;
};

/**
 * 카테고리 등록
 * @param categoryName
 * @param boardType
 */
export const registerCategory = async (
  categoryName: string,
  boardType: string
) => {
  const { data } = await authInstance.post(
    "/board-service/board/" +
      boardType +
      "/category?categoryName=" +
      categoryName
  );
  return data;
};

/**
 * 카테고리 수정
 * @param categoryModifyRequestDto
 */
interface categoryModifyRequestDto {
  categoryId: number;
  categoryName: string;
}
export const modifyCategory = async (
  categoryModifyRequestDto: categoryModifyRequestDto
) => {
  const { data } = await authInstance.put(
    "/board-service/board/category",
    categoryModifyRequestDto
  );
  return data;
};

/**
 * 카테고리 삭제
 * @param categoryId
 */
export const deleteCategory = async (categoryId: number) => {
  const { data } = await authInstance.delete(
    "/board-service/board/category?categoryId=" + categoryId
  );
  return data;
};

/**
 * 게시판 검색
 * @param boardType
 * @param categoryId
 * @param keyword
 */
export const searchBoardList = async (
  boardType: string,
  categoryId: number,
  keyword: string
) => {
  const { data } = await authInstance.get(
    "/board-service/board/" +
      boardType +
      "/search?categoryId=" +
      categoryId +
      "&keyword=" +
      keyword
  );
  return data;
};

/**
 * 게시글 상세
 * @param boardId
 */
export const getBoardDetail = async (boardType: string, boardId: number) => {
  const { data } = await authInstance.get(
    "/board-service/board/" + boardType + "/detail?boardId=" + boardId
  );
  return data;
};

interface boardRegisterDto {
  categoryId: number;
  boardTitle: string;
  boardContents: string;
  thumbnail: string | null;
}

/**
 * 게시글 작성
 * @param boardType
 * @param boardRegisterDto
 */
export const registerBoard = async (
  boardType: string,
  boardRegisterDto: boardRegisterDto
) => {
  const { data } = await authInstance.post(
    "/board-service/board/" + boardType,
    boardRegisterDto
  );
  return data;
};

/**
 * 게시글 수정
 * @param boardModifyRequestDto
 */
interface boardModifyRequestDto {
  boardId: number;
  categoryId: number;
  boardTitle: string;
  boardContents: string;
  thumbnail: string | null;
}
export const modifyboard = async (
  boardType: string,
  boardModifyRequestDto: boardModifyRequestDto
) => {
  const { data } = await authInstance.put(
    "/board-service/board/" + boardType,
    boardModifyRequestDto
  );
  return data;
};

/**
 * 게시글 삭제
 * @param boardId
 */
export const removeBoard = async (boardType: string, boardId: number) => {
  const { data } = await authInstance.delete(
    "/board-service/board/" + boardType + "?boardId=" + boardId
  );
  return data;
};

/**
 * 내 게시글 조회
 * @param memberId
 */
export const getMemberBoard = async () => {
  const { data } = await authInstance.get("/board-service/board/member");
  return data;
};

/**
 * 내 댓글 조회
 * @param memberId
 */
export const getMemberComment = async () => {
  const { data } = await authInstance.get(
    "/board-service/board/member/comment"
  );
  return data;
};

/**
 * 댓글 등록
 */
interface commentRegisterRequestDto {
  boardId: number;
  commentContents: string;
  masterCommentId: number;
}
export const registerComment = async (
  commentRegisterRequestDto: commentRegisterRequestDto
) => {
  const { data } = await authInstance.post(
    "/board-service/board/comment",
    commentRegisterRequestDto
  );
  return data;
};

/**
 * 댓글 수정
 * @param commentModifyRequestDto
 */
interface commentModifyRequestDto {
  commentId: number;
  commentContents: string;
}
export const modifyComment = async (
  commentModifyRequestDto: commentModifyRequestDto
) => {
  const { data } = await authInstance.put(
    "/board-service/board/comment",
    commentModifyRequestDto
  );
  return data;
};

/**
 * 댓글 삭제
 * @param commentId
 */
export const removeComment = async (commentId: number) => {
  const { data } = await authInstance.delete(
    "/board-service/board/comment/" + commentId
  );
  return data;
};
