import { KAKAO_OAUTH_URI } from "../../apis/auth/oauthKakao";
import KakaoButton from "../../assets/images/kakao_login_large_wide.png";

export default function OAuthLogin() {
  return (
    <>
      {/* width 줄어들면 줄바꿈 이상하게 되는데(소셜 계정으로 간편 로\n그인) text-center, text-justify 등 해봐도 이쁘게(소셜 계정으로\n간편 로그인) 안 나옴*/}
      <p className="pb-16 font-thin text-base text-center dark:text-grayscale1">
        소셜 계정으로 간편 로그인
      </p>
      <div className="py-[5%] flex items-center justify-center min-w-fit">
        <a href={KAKAO_OAUTH_URI}>
          <img src={KakaoButton} alt="카카오로그인" />
        </a>
      </div>
    </>
  );
}
