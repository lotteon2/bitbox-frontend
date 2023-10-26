import { defaultInstance } from "../utils";

interface loginDto {
  email: string;
  password: string;
}
export const localLogin = async (loginDto: loginDto) => {
  const { data } = await defaultInstance.post(
    "/authentication-service/auth/admin",
    loginDto
  );
  return data;
};
