import { authInstance } from "../utils";

// /**
//  * 회원가입
//  * @returns
//  */
// export const registMemberImfo = async () => {
//   const { data } = await defaultInstance.post("/user-service/member/signup");
//   return data;
// };

/**
 * 교육생 이름 등록
 * @param memberName
 * @returns
 */
export const registTraineeName = async (memberName: string) => {
  const { data } = await authInstance.patch(
    "/user-service/member/name",
    memberName
  );
  return data;
};

/**
 * 내정보 조회
 * @returns
 */
export const getMyInfo = async () => {
  const { data } = await authInstance.get("/user-service/member/mypage");
  return data;
};

/**
 * 내 정보 수정
 */
interface memberInfoUpdateDto {
  memberNickname: string | null;
  memberProfileImg: string | null;
}
export const updateMemberInfo = async (update: memberInfoUpdateDto) => {
  const { data } = await authInstance.patch(
    "/user-service/member/mypage",
    update
  );
  return data;
};

/**
 * 회원 탈퇴
 */
export const withdrawMember = async () => {
  const { data } = await authInstance.delete("/user-service/member/mypage");
  return data;
};

/**
 * 출결 조회
 */
export const getAllMyAttendance = async () => {
  const { data } = await authInstance.get(
    "/user-service/member/mypage/attendance"
  );
  return data;
};

/**
 * 입실 체크
 */
interface currentLocationDto {
  lat: number;
  lng: number;
  current: string | null;
}
export const memberEntrace = async (location: currentLocationDto) => {
  const { data } = await authInstance.patch(
    "/user-service/mypage/attendance/entrace",
    location
  );
  return data;
};

/**
 * 퇴실 체크
 */
export const memberQuit = async (location: currentLocationDto) => {
  const { data } = await authInstance.patch(
    "/user-service/mypage/attendance/quit",
    location
  );
  return data;
};
