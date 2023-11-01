import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
/**
 * 로그인 여부
 */
export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/**
 * Access Token
 */
export const accessToken = atom({
  key: "accessToken",
  default: "",
});

/**
 * 사용자 정보 - 사용자 PK, 크레딧, 반 PK
 */
export const memberState = atom({
  key: "memberState",
  default: {
    memberId: "",
    remainCredit: 0,
    classId: -1,
  },
  effects_UNSTABLE: [persistAtom],
});

/**
 * 사용자 권한 정보 - 권한 PK
 */
export const authorityState = atom({
  key: "authorityState",
  default: "GENERAL",
  effects_UNSTABLE: [persistAtom],
});

/**
 * true: 다크모드, false: 라이트모드
 */
export const darkmodeState = atom({
  key: "darkmodeState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 채팅방 열림 여부
 */
export const chatState = atom({
  key: "chatState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/**
 * true: 리스트, false: 상세
 */
export const chatroomState = atom({
  key: "chatroomState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

/**
 * 사용자 반 정보 - 반 PK or 반 이름
 */
export const classState = atom({
  key: "classState",
  default: -1, // 반 이름일 경우 default: ""
  effects_UNSTABLE: [persistAtom],
});

/**
 * 정액권 정보 - 정액권 PK
 */
export const subscriptionState = atom({
  key: "subscriptionState",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export const setNameState = atom({
  key: "setNameState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
