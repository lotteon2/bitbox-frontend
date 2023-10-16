import { defaultInstance, authInstance } from "../utils";

export const registMemberImfo = async () => {
  const { data } = await defaultInstance.post("/member/signup");
  return data;
};

export const getMyInfo = async () => {
  const { data } = await authInstance.get("/member/mypage");
  return data;
};
