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
 * 내정보 조회(관리자)
 * @returns
 */
export const getAdminInfo = async () => {
  const { data } = await authInstance.get("/admin-service/admin/one");
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
 * 내 정보 수정(관리자)
 */
interface adminInfoUpdateDto {
  adminProfileImg: string;
  adminName: null;
  adminPassword: null;
  isDeleted: null;
}
export const updateAdminMemberInfo = async (update: adminInfoUpdateDto) => {
  const { data } = await authInstance.patch("/admin-service/admin", update);
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
    "/user-service/member/mypage/attendance/entrance",
    location
  );
  return data;
};

/**
 * 퇴실 체크
 */
export const memberQuit = async (location: currentLocationDto) => {
  const { data } = await authInstance.patch(
    "/user-service/member/mypage/attendance/quit",
    location
  );
  return data;
};

/**
 * 내 성적 조회
 */
export const getMyGrades = async () => {
  const { data } = await authInstance.get("/admin-service/admin/grade/mygrade");
  return data;
};

interface memberInfo {
  name: string;
  classId: number;
}

/**
 * 교육생 정보 등록
 */
export const updateMemberName = async (memberInfo: memberInfo) => {
  const { data } = await authInstance.patch(
    "/user-service/member/name",
    memberInfo
  );
  return data;
};

interface reasonStatementRegisterDto {
  attendanceId: number;
  reasonTitle: string;
  reasonContent: string;
  reasonAttachedFile: string | null;
}
/**
 * 사유서 등록
 */
export const registReasonStatement = async (
  dto: reasonStatementRegisterDto
) => {
  const { data } = await authInstance.post(
    "/user-service/member/mypage/reason",
    dto
  );
  return data;
};
