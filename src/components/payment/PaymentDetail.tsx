import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function PaymentDetail() {
  const [question1, setQuestion1] = useState<boolean>(false);
  const [question2, setQuestion2] = useState<boolean>(false);
  const [question3, setQuestion3] = useState<boolean>(false);
  const [question4, setQuestion4] = useState<boolean>(false);

  return (
    <div className="m-auto w-[80%] flex flex-col gap-2">
      <div className="border-2 pl-5 py-4 rounded-lg relative">
        {question1 ? (
          <ArrowDropUpIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion1((cur) => !cur)}
          />
        ) : (
          <ArrowDropDownIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion1((cur) => !cur)}
          />
        )}
        <p className="font-bold text-3xl w-[90%]">크레딧은 어디에 쓰이나요?</p>
        {question1 ? (
          <p className="mt-5 text-xl">
            크레딧을 통해 비공개된 메세지를 확인할 수 있습니다. 1개의 메세지를
            확인할 때 1 크레딧이 차감됩니다.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="border-2 pl-5 py-4 rounded-lg relative">
        {question2 ? (
          <ArrowDropUpIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion2((cur) => !cur)}
          />
        ) : (
          <ArrowDropDownIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion2((cur) => !cur)}
          />
        )}
        <p className="font-bold text-3xl w-[90%]">
          크레딧과 구독권은 어떤 차이가 있나요?
        </p>
        {question2 ? (
          <p className="mt-5 text-xl">
            크레딧은 채팅 횟수가 제한되어 있지만 구독권은 기간 내 무제한 채팅을
            이용할 수 있습니다.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="border-2 pl-5 py-4 rounded-lg relative">
        {question3 ? (
          <ArrowDropUpIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion3((cur) => !cur)}
          />
        ) : (
          <ArrowDropDownIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion3((cur) => !cur)}
          />
        )}
        <p className="font-bold text-3xl w-[90%]">구독권은 언제 갱신되나요?</p>
        {question3 ? (
          <p className="mt-5 text-xl">
            구독권은 결제일시 정각에 갱신됩니다. 11시 30분에 1일권을 결제했다면
            다음날 11시에 갱신되는 형태입니다.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="border-2 pl-5 py-4 rounded-lg relative">
        {question4 ? (
          <ArrowDropUpIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion4((cur) => !cur)}
          />
        ) : (
          <ArrowDropDownIcon
            className="absolute right-2 top-2 cursor-pointer"
            sx={{ fontSize: "50px", color: "#808080" }}
            onClick={() => setQuestion4((cur) => !cur)}
          />
        )}
        <p className="font-bold text-3xl w-[90%]">환불 정책은 어떻게 되나요?</p>
        {question4 ? (
          <p className="mt-5 text-xl">
            환불은 지원하고 있지 않습니다. 신중히 고민하시고 결제해주세요.
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
