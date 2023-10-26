import { authInstance } from "../utils";

export const imageUpload = async (image: any) => {
  const { data } = await authInstance.post("/file-service/file/image", image);
  return data;
};
