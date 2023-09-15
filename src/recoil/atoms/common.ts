import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: false
});


export const darkMode = atom({
    key: "darkMode",
    default: false
});

/**
 * true: 리스트, false: 상세
 */
export const chatState = atom({
    key: "chatState",
    default: false
})