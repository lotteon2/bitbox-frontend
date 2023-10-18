import { defaultInstance } from "../utils";

export const KAKAO_OAUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&scope=${process.env.REACT_APP_KAKAO_SCOPE}`;

export const oauthKakao = async (code: string | null) => {
  const { data } = await defaultInstance.get(
    `/authentication-service/oauth/kakao/token?code=${code}`
  );
  return data;
};
