import PaymentList from "../components/payment/PaymentList";

export default function PaymentListPage() {
  return (
    <div>
      <p className="font-extrabold text-4xl">결제내역</p>
      <PaymentList />
    </div>
  );
}
