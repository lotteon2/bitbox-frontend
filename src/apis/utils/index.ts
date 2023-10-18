import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// 기본 API 요청 처리
const axiosApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "http://localhost:3001",
    // },
  });
  return instance;
};

// 로그인 이용자 API 요청 처리
const axiosAuthApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
  });

  instance.defaults.headers.common["memberId"] = "csh";
  // TODO: 로그인 정보 저장 및 API에 인증 토큰 붙이는 코드
  instance.interceptors.request.use((config) => {
    config.headers.Authorization =
      "Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJfaWQiOiI3N2I4YjJkYi0xODc5LTQ2MGMtOWU3OS1jNWQ4OTQ0MGI0Y2QiLCJtZW1iZXJfbmlja25hbWUiOiLquYDsoJXsnKQiLCJjbGFzc19pZCI6bnVsbCwibWVtYmVyX2F1dGhvcml0eSI6IlRSQUlORUUiLCJleHAiOjE2OTg4Mjk4ODh9.GDEFhgc_bVxmLUC66DzfKfMAAte5koHn4Fj0hN0HreU";
    return config;
  });
  return instance;
};
export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
