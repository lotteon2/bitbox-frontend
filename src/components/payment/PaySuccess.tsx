import { useEffect } from "react";
import PaymentPage from "../../pages/PaymentPage";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../recoil/atoms/common";
import { useNavigate } from "react-router-dom";

export default function PaySuccess() {
  const isDark = useRecoilValue(darkmodeState);
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "<p style='text-align: center'>결제가 완료되었습니다.</p>",
      text: "결제 내역 페이지로 이동하시겠습니까?",
      iconHtml:
        '<a><img src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: isDark ? "#66B966" : "#00A400", // confrim 버튼 색깔 지정
      cancelButtonColor: isDark ? "#C6C6C6" : "#808080", // cancel 버튼 색깔 지정
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
      background: isDark ? "#202027" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 모달창에서 confirm 버튼을 눌렀다면
        navigate("/payment/paymentList");
      } else {
        // 모달창에서 cancel 버튼을 눌렀다면
        navigate("/payment");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PaymentPage />
    </div>
  );
}
