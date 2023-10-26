import axios, { HttpStatusCode } from "axios";

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

const axiosImageApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true,
  });

  // TODO: 로그인 정보 저장 및 API에 인증 토큰 붙이는 코드
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error: any) => {
      const {
        config,
        response: { status },
      } = error;

      // localStorage에 accessToken이 있는데 HTTP response code가 401이 왔을 때
      if (
        status === HttpStatusCode.Unauthorized &&
        localStorage.getItem("accessToken") !== null
      ) {
        const originalRequest = config; // 원래 요청 저장

        // refresh 요청
        const response = await axios.post(
          BASE_URL + "/authentication-service/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // 이 요청의 응답이 403이 오면 refresh 실패.
        if (response.status === HttpStatusCode.Forbidden) {
          localStorage.removeItem("accessToken");
          return;
        }

        localStorage.setItem("accessToken", response.data["accessToken"]);

        // 원래 하려던 요청 다시 보낸다
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        return axios(originalRequest);
      }
    }
  );

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
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error: any) => {
      const {
        config,
        response: { status },
      } = error;

      // localStorage에 accessToken이 있는데 HTTP response code가 401이 왔을 때
      if (
        status === HttpStatusCode.Unauthorized &&
        localStorage.getItem("accessToken") !== null
      ) {
        const originalRequest = config; // 원래 요청 저장

        // refresh 요청
        const response = await axios.post(
          BASE_URL + "/authentication-service/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // 이 요청의 응답이 403이 오면 refresh 실패.
        if (response.status === HttpStatusCode.Forbidden) {
          localStorage.removeItem("accessToken");
          return;
        }

        localStorage.setItem("accessToken", response.data["accessToken"]);

        // 원래 하려던 요청 다시 보낸다
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        return axios(originalRequest);
      }
    }
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const imageInstance = axiosImageApi(BASE_URL);
