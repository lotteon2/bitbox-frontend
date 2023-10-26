import { authInstance } from "../utils";

export const imageUpload = async (image: any) => {
  const { data } = await authInstance.patch("/file-service/file/image", image);
  return data;
};
