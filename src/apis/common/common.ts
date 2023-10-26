import { imageInstance } from "../utils";

export const imageUpload = async (image: any) => {
  const { data } = await imageInstance.post("/file-service/file/image", image);
  return data;
};
