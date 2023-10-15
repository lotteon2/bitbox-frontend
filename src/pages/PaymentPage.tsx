import React, { useState } from "react";
import PaymentDetail from "../components/payment/PaymentDetail";
import ChargeItem from "../components/payment/ChargeItem";
import uuid from "react-uuid";

interface PayType {
  partnerOrderId: string;
  itemName: string;
  quantity: number;
  totalAmount: number;
  taxFreeAmount: number;
  subscriptionType: string | null;
  chargeCredit: number | null;
}

export default function PaymentPage() {
  const [payType, setPayType] = useState<PayType>({
    partnerOrderId: uuid(),
    itemName: "크레딧 5개",
    quantity: 1,
    totalAmount: 500,
    taxFreeAmount: 50,
    subscriptionType: null,
    chargeCredit: 5,
  });

  // payType을 업데이트하는 함수 정의
  const updatePayType = (newPayType: PayType) => {
    setPayType((prevPayType) => ({
      ...prevPayType,
      itemName: newPayType.itemName,
      totalAmount: newPayType.totalAmount,
      taxFreeAmount: newPayType.taxFreeAmount,
      chargeCredit: newPayType.chargeCredit,
    }));
  };

  return (
    <div>
      충전하기
      <div className="flex flex-row flex-wrap m-auto">
        <ChargeItem
          title="크레딧 결제"
          description="BITBOX의 채팅 기능을 이용할 수 있는"
          item="단건 크레딧"
          itemPrice="500원"
          payType={payType}
          updatePayType={updatePayType}
        />
        <ChargeItem
          title="1일권 결제"
          description="1일 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="1일권"
          itemPrice="900원"
          payType={{
            partnerOrderId: uuid(),
            itemName: "구독권 1일",
            quantity: 1,
            totalAmount: 900,
            taxFreeAmount: 90,
            subscriptionType: "ONE_DAY",
            chargeCredit: null,
          }}
          updatePayType={updatePayType}
        />
        <ChargeItem
          title="3일권 결제"
          description="3일 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="3일권"
          itemPrice="2100원"
          payType={{
            partnerOrderId: uuid(),
            itemName: "구독권 3일",
            quantity: 1,
            totalAmount: 2100,
            taxFreeAmount: 210,
            subscriptionType: "THREE_DAYS",
            chargeCredit: null,
          }}
          updatePayType={updatePayType}
        />
        <ChargeItem
          title="7일권 결제"
          description="1주 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="7일권"
          itemPrice="3500원"
          payType={{
            partnerOrderId: uuid(),
            itemName: "구독권 7일",
            quantity: 1,
            totalAmount: 3500,
            taxFreeAmount: 350,
            subscriptionType: "SEVEN_DAYS",
            chargeCredit: null,
          }}
          updatePayType={updatePayType}
        />
      </div>
      <PaymentDetail />
    </div>
  );
}
