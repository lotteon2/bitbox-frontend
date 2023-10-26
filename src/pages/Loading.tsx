import LoadingGif from "../assets/images/Loading.gif";

export default function Loading() {
  return (
    <img src={LoadingGif} alt="로딩 이미지" className="w-60 mx-auto my-20" />
  );
}
