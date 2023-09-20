import { atom } from "recoil";

/**
 * 로그인 여부
 */
export const loginState = atom({
    key: "loginState",
    default: true
});

/**
 * 사용자 정보 - 사용자 PK
 */
export const memberState = atom({
    key: "memberState",
    default: {
        memberId: -1,
        remainCredit: 0
    }
});

/**
 * 사용자 권한 정보 - 권한 PK
 */
export const authorityState = atom({
    key: "authorityState",
    default: -1
});

/**
 * true: 다크모드, false: 라이트모드
 */
export const darkmodeState = atom({
    key: "darkmodeState",
    default: false
});

/**
 * true: 리스트, false: 상세
 */
export const chatroomState = atom({
    key: "chatroomState",
    default: false
});

/**
 * 사용자 반 정보 - 반 PK or 반 이름
 */
export const classState = atom({
    key: "classState",
    default: -1 // 반 이름일 경우 default: ""
});


/**
 * 정액권 정보 - 정액권 PK
 */
export const subscriptionState = atom({
    key: "subscriptionState",
    default: -1
});