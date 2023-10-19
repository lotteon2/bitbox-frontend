import React from "react";
import PaymentList from "../payment/PaymentList";

export default function MyCredit() {
  return (
    <div>
      <p className="text-2xl pb-5">크레딧 관리</p>
      <PaymentList />
    </div>
  );
}
