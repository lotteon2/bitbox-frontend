import { authInstance } from "../utils";

export const logout = async () => {
  const { data } = await authInstance.delete(
    "authentication-service/auth/logout"
  );
  return data;
};
