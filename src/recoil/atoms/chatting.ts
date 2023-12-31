import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/**
 * 채팅 개수
 */
export const chattingCountState = atom({
  key: "chattingCountState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 채팅 목록
 */
export const chattingRoomListState = atom({
  key: "chattingRoomListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 클릭한 이미지
 */
export const chattingUserProfileImg = atom({
  key: "chattingUserProfileImg",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 클릭한 유저아이디
 */
export const chattingUserId = atom({
  key: "chattingUserId",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 클릭한 유저명
 */
export const chattingUserName = atom({
  key: "chattingUserName",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 특정 채팅방의 게스트
 */
export const chattingRoomGuestId = atom({
  key: "chattingRoomGuestId",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 채팅방 번호
 */
export const chattingRoomNumberState = atom({
  key: "chattingRoomNumberState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const chattingChangeState = atom({
  key: "chattingChangeState",
  default: false,
});
