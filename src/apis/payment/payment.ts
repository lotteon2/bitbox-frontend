import { authInstance } from "../utils";

interface PayType {
  partnerOrderId: string;
  itemName: string;
  quantity: number;
  totalAmount: number;
  taxFreeAmount: number;
  subscriptionType: string | null;
  chargeCredit: number | null;
}

const fixUrl = "/payment-service/";

export const getKakaoUrl = async (payType: PayType) => {
  const response = await authInstance.post(
    fixUrl + "kakao-pay/payment-request",
    payType
  );
  return response.data;
};

export const getKakaoPopup = async (callUrl: string) => {
  // 팝업 창 열기
  window.location.href = callUrl;
};

export const getPaymentListCount = async () => {
  return await authInstance.get(fixUrl + "member/payments/count?size=5");
};

export const getPaymentList = async (page: number) => {
  return await authInstance.get(
    fixUrl + "member/payments?page=" + page + "&size=5"
  );
};
