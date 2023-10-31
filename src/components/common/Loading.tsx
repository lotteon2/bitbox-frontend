import LoadingGif from "../../assets/images/Loading.gif";

const Loading = () => {
  return (
    <div className="w-full py-20 z-20">
      <img src={LoadingGif} alt="로딩 이미지" className="m-auto" />
    </div>
  );
};
export default Loading;
