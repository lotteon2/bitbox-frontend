import { atom } from "recoil";

/**
 * 변경 여부
 */
export const changeState = atom({
  key: "changeState",
  default: false,
});

/**
 * 날짜
 */
export const dateState = atom({
  key: "date",
  default: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
});
