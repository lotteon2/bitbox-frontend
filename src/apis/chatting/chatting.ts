import { authInstance } from "../utils";

const fixUrl = "/chatting-service/";

export const getConnectionList = async () => {
  return await authInstance.get(fixUrl + "connection/list");
};

export const getChattingList = async () => {
  return await authInstance.get(fixUrl + "chatting-room");
};

export const getChatting = async (chatRoomId: number) => {
  return await authInstance.get(fixUrl + "chatting-room/" + chatRoomId);
};

export const payChatting = async (chatId: number) => {
  return await authInstance.post(fixUrl + "message/" + chatId);
};
