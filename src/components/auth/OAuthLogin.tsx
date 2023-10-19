import { KAKAO_OAUTH_URI } from "../../apis/auth/oauthKakao";
import KakaoButton from "../../assets/images/kakao_login_large_wide.png";

import { authInstance } from "../../apis/utils";

export default function OAuthLogin() {
  const refreshTest = async () => {
    const { data } = await authInstance.post(
      "/authenticaion-service/auth/refresh"
    );
  };

  return (
    <>
      <button onClick={refreshTest}>리프레시 테스트</button>
      <p className="pb-16 font-thin text-base dark:text-grayscale1">
        소셜 계정으로 간편 로그인
      </p>
      <div className="py-[5%] flex items-center justify-center">
        <a href={KAKAO_OAUTH_URI}>
          <img src={KakaoButton} alt="카카오로그인" />
        </a>
      </div>
    </>
  );
}
