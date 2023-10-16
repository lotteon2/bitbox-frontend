import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// 기본 API 요청 처리
const axiosApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return instance;
};

// 로그인 이용자 API 요청 처리
const axiosAuthApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
  });

  // TODO: 로그인 정보 저장 및 API에 인증 토큰 붙이는 코드
  instance.interceptors.request.use((config) => {
    config.headers.Authorization =
      "Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJfaWQiOiJjMzA1MGRlNS1mNjM4LTRlM2EtOWJlMC1jMWY3YTgzMzZhNTMiLCJtZW1iZXJfbmlja25hbWUiOiLsoITsooXrr7wiLCJjbGFzc19pZCI6bnVsbCwibWVtYmVyX2F1dGhvcml0eSI6IkdFTkVSQUwiLCJleHAiOjE2OTc0NDQyODV9.QWkssbDnz4VkJvLteM3VspSHAEDpgj6YNjsCVR-8qXg";
    return config;
  });
  return instance;
};
export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
