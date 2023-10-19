import React, { useEffect, useState } from "react";
import { getPaymentList, getPaymentListCount } from "../apis/payment/payment";
import { useMutation } from "react-query";
import { Pagination } from "@mui/material";
import crditImg from "../assets/images/credit.png";
import subscriptionImg from "../assets/images/subscription.png";

type Payment = {
  paymentId: number;
  memberId: string;
  paymentDate: string;
  paymentAmount: number;
  taxFreeAmount: number;
  productName: string;
  paymentSerial: string;
  paymentType: string;
};

export default function PaymentListPage() {
  const [pageCount, setPageCount] = useState(0); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [payments, setPayments] = useState<Payment[]>([]); // 결제 데이터

  const { mutate } = useMutation(
    ["getPaymentListCount"],
    () => getPaymentListCount(),
    {
      onSuccess: (data) => {
        const pageCount = data.data.pageCount;
        setPageCount(pageCount);
        if (pageCount > 0) {
          getPaymentList(0).then((data) => {
            setPayments(data.data);
          });
        }
      },
      onError: (error) => alert("결제 관련 페이지를 가져오는 데 실패했습니다."),
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  const handlerPageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
    if (newPage > 0) {
      getPaymentList(newPage - 1).then((data) => {
        setPayments(data.data);
      });
    }
  };

  const handleDetailClick = (payment: Payment) => {
    // 팝업이 뜬다 payment로 데이터를 뿌린다
  };

  return (
    <div>
      <div>
        {payments.map((payment) => (
          <div
            key={payment.paymentId}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={
                payment.productName.slice(0, 3) === "크레딧"
                  ? crditImg
                  : subscriptionImg
              }
              alt={`Payment ${payment.paymentId}`}
              style={{ marginRight: "10px" }}
            />
            <div>
              <p>{payment.paymentDate.slice(0, 10)}</p>
              <p>{payment.productName}</p>
              <p>{payment.paymentAmount}원</p>
            </div>

            <button
              className="my-10 px-10 py-5 text-grayscale1 bg-secondary1 rounded-lg dark:bg-secondary2"
              onClick={() => handleDetailClick(payment)}
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlerPageChange}
      />
    </div>
  );
}
