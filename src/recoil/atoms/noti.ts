import { atom } from "recoil";

/**
 * 알림 드롭다운 on/off
 */
export const notiShowState = atom({
  key: "notiShowState",
  default: false,
});

/**
 * 읽지 않은 알림 갯수
 */
export const notiCountState = atom({
  key: "notiCountState",
  default: 0,
});

/**
 * 새 알림이 올 때 상태가 바뀜
 */
export const notiEventState = atom({
  key: "notiEventState",
  default: false,
});
