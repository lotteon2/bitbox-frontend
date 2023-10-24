import { authInstance } from "../utils";

const fixUrl = "/chatting-service/";

export const getConnectionList = async () => {
  return await authInstance.get(fixUrl + "connection/list");
};
