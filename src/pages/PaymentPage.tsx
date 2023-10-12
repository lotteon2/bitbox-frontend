import PaymentDetail from "../components/payment/PaymentDetail";
import ChargeItem from "../components/payment/ChargeItem";

export default function PaymentPage() {
  return (
    <div>
      충전하기
      <div className="flex flex-row flex-wrap m-auto">
        <ChargeItem
          title="크레딧 결제"
          description="BITBOX의 채팅 기능을 이용할 수 있는"
          item="단건 크레딧"
          itemPrice="500원"
          buttonUrl=""
        />
        <ChargeItem
          title="1일권 결제"
          description="1일 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="1일권"
          itemPrice="900원"
          buttonUrl=""
        />
        <ChargeItem
          title="3일권 결제"
          description="3일 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="3일권"
          itemPrice="2100원"
          buttonUrl=""
        />
        <ChargeItem
          title="7일권 결제"
          description="1주 동안 무제한으로 채팅 기능을 이용할 수 있는"
          item="7일권"
          itemPrice="3500원"
          buttonUrl=""
        />
      </div>
      <PaymentDetail />
    </div>
  );
}
