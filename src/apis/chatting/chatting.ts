import { authInstance } from "../utils";

const fixUrl = "/chatting-service/";

export const getChattingList = async () => {
  return await authInstance.get(fixUrl + "chatting-room");
};

export const getChatting = async (chatRoomId: number) => {
  return await authInstance.get(fixUrl + "chatting-room/" + chatRoomId);
};

export const payChatting = async (chatId: number) => {
  return await authInstance.post(fixUrl + "message/" + chatId);
};

interface chattingDto {
  guestId: string;
  guestName: string;
  guestProfileImg: string;
}
export const startChatting = async (chattingDto: chattingDto) => {
  return await authInstance.post(fixUrl + "chatting-room", chattingDto);
};
