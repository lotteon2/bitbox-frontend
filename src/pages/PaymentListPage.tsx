import React, { useEffect, useState } from "react";
import { getPaymentList, getPaymentListCount } from "../apis/payment/payment";
import { useMutation } from "react-query";
import { Pagination } from "@mui/material";

export default function PaymentListPage() {
  const [pageCount, setPageCount] = useState(0); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const { mutate } = useMutation(
    ["getPaymentListCount"],
    () => getPaymentListCount(),
    {
      onSuccess: (data) => {
        const pageCount = data.data.pageCount;
        setPageCount(pageCount);
      },
      onError: (error) => alert("결제 관련 페이지를 가져오는 데 실패했습니다."),
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  const payments = [
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
    { id: 3, amount: 300 },
  ];
  const handlerPageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
    if (newPage > 0) {
      getPaymentList(newPage - 1).then((data) => {
        console.log(data);
      });
    }
  };

  return (
    <div>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlerPageChange}
      />
      <div>
        {payments.map((payment) => (
          <p key={payment.id}>
            Payment ID: {payment.id}, Amount: {payment.amount}
          </p>
        ))}
      </div>
    </div>
  );
}
