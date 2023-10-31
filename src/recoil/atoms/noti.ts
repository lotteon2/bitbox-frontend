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

/**
 * FE에서 알림의 상태를 변경했을 때(읽음 처리, 삭제 처리) 바뀜
 */
export const notiChangedState = atom({
  key: "notiChangedState",
  default: false,
});
