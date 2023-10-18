import { defaultInstance } from "../utils";

export const localLogin = async () => {
  const { data } = await defaultInstance.get(
    "/authentication-service/auth/admin"
  );
  return data;
};
