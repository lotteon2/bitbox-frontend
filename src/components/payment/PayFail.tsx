import { useEffect } from "react";
import PaymentPage from "../../pages/PaymentPage";
import { Toast } from "../common/Toast";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../recoil/atoms/common";
import { useNavigate } from "react-router-dom";

export default function PayFail() {
  const isDark = useRecoilValue(darkmodeState);
  const navigate = useNavigate();

  useEffect(() => {
    Toast.fire({
      iconHtml:
        '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
      title: "결제에 실패했습니다.",
      background: isDark ? "#4D4D4D" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    });

    navigate("/payment");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <PaymentPage />;
}
