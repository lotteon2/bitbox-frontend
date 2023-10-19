import { useEffect, useState } from "react";
import {
  getPaymentList,
  getPaymentListCount,
} from "../../apis/payment/payment";
import { useMutation } from "react-query";
import { Pagination } from "@mui/material";
import crditImg from "../../assets/images/credit.png";
import subscriptionImg from "../../assets/images/subscription.png";
import Stack from "@mui/material/Stack";
import { Button, Modal } from "antd";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "../../recoil/atoms/common";

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

export default function PaymentList() {
  const [pageCount, setPageCount] = useState(0); // 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [payments, setPayments] = useState<Payment[]>([]); // 결제 데이터
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paymentItem, setPaymentItem] = useState<Payment>();
  const isDark = useRecoilValue(darkmodeState);

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
      onError: () => alert("결제 관련 페이지를 가져오는 데 실패했습니다."),
    }
  );

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerPageChange = (event: any, newPage: number) => {
    setCurrentPage(event.selected);
    if (newPage > 0) {
      getPaymentList(newPage - 1).then((data) => {
        setPayments(data.data);
      });
    }
  };

  // Click 확인
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // Click 취소 - Setting Default
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDetailClick = (payment: Payment) => {
    // 팝업이 뜬다 payment로 데이터를 뿌린다
    setIsModalOpen(true);
    setPaymentItem(payment);
  };

  return (
    <div>
      <div className="flex flex-col w-[800px] m-auto my-5 gap-5 relative">
        {payments.map((payment) => (
          <div
            key={payment.paymentId}
            className="flex flex-row px-10 py-5 gap-5 shadow-xl rounded-lg"
          >
            <img
              src={
                payment.productName.slice(0, 3) === "크레딧"
                  ? crditImg
                  : subscriptionImg
              }
              alt={`Payment ${payment.paymentId}`}
              className="w-32 h-32 mt-2"
            />
            <div className="mt-8">
              <p>{payment.paymentDate.slice(0, 10)}</p>
              <p className="text-xl">{payment.productName}</p>
              <p className="font-bold">{payment.paymentAmount}원</p>
            </div>

            <button
              className="my-10 px-10 py-5 text-grayscale1 bg-secondary1 rounded-lg absolute right-10 dark:bg-secondary2"
              onClick={() => handleDetailClick(payment)}
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
      <Stack alignItems="center" className="mt-16">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlerPageChange}
          sx={{ color: "#fff" }}
        />
      </Stack>
      <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="dark:bg-grayscale7 dark:text-grayscale1">
            결제 내역 상세
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            className="w-[150px] h-[40px] text-lg font-regular bg-grayscale4 text-grayscale1 border-none dark:bg-grayscale6 hover:text-grayscale1 hover:opacity-80"
            onClick={handleCancel}
          >
            닫기
          </Button>,
          <Button
            key="save"
            className="w-[150px] h-[40px] text-lg font-regular bg-secondary1 text-grayscale1 border-none dark:bg-secondary2 hover:text-grayscale1 hover:opacity-80"
            onClick={handleOk}
          >
            확인
          </Button>,
        ]}
      >
        <div className="w-[80%] m-auto my-10 flex flex-row gap-20 text-lg dark:text-grayscale1">
          <div className="flex flex-col gap-5 font-regular">
            <p>주문번호</p>
            <p>거래일시</p>
            <p>상품명</p>
            <p>합계</p>
            <p>회사명</p>
          </div>
          <div className="flex flex-col gap-5 text-right font-bold">
            <p>{paymentItem?.paymentSerial}</p>
            <p>
              {paymentItem?.paymentDate.slice(0, 10)} &nbsp;
              {paymentItem?.paymentDate.slice(11, 19)}
            </p>
            <p>{paymentItem?.productName}</p>
            <p>{paymentItem?.paymentAmount}원</p>
            <p>(주) 비트박스</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
