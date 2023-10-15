import { defaultInstance, authInstance } from "../utils";

interface PayType {
  partnerOrderId: string;
  itemName: string;
  quantity: number;
  totalAmount: number;
  taxFreeAmount: number;
  subscriptionType: string | null;
  chargeCredit: number | null;
}

export const getKakaoUrl = async (payType: PayType) => {
  const response = await authInstance.post(
    "/payment-service/kakao-pay/payment-request",
    payType
  );
  return response.data;
};

export const getKakaoPopup = async (callUrl: string) => {
  // 팝업 창 열기
  const popup = window.open(
    callUrl,
    "카카오 결제 팝업",
    "width=800, height=600"
  );
};
