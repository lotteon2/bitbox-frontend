import { authInstance } from "../utils";

/**
 * 게시글 리스트 조회
 */
export const getBoardList = async (boardType: string, categoryId: number) => {
  const { data } = await authInstance.get(
    "/board-service/board/" + boardType + "?categoryId=" + categoryId
  );
  return data;
};

interface boardRegisterDto {
  memberId: string;
  memberName: string;
  categoryId: number;
  boardTitle: string;
  boardContents: string;
}
/**
 * 글 작성
 */
export const registerBoard = async (
  boardType: string,
  boardRegisterDto: boardRegisterDto
) => {
  const { data } = await authInstance.post(
    "/board-service/baoard/" + boardType,
    boardRegisterDto
  );
  return data;
};

/**
 * 게시글 상세
 */
export const getBoardDetail = async (boardType: string, boardId: number) => {
  const { data } = await authInstance.get(
    "/board-service/board/" + boardType + "/detail/" + boardId
  );
  return data;
};
