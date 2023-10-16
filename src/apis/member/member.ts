import { defaultInstance, authInstance } from "../utils";

export const registMemberImfo = async () => {
  const { data } = await defaultInstance.post("/user-service/member/signup");
  return data;
};

export const getMyInfo = async () => {
  const { data } = await authInstance.get("/user-service/member/mypage");
  return data;
};
