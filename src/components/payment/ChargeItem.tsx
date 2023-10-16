import React, { useState } from "react";
import { getKakaoUrl } from "../../apis/payment/payment";
import { getKakaoPopup } from "../../apis/payment/payment";
import { useMutation } from "react-query";

interface CreditItemProps {
  title: string;
  description: string;
  item: string;
  itemPrice: string;
  payType: PayType;
  updatePayType: (newPayType: PayType) => void;
}

interface PayType {
  partnerOrderId: string;
  itemName: string;
  quantity: number;
  totalAmount: number;
  taxFreeAmount: number;
  subscriptionType: string | null;
  chargeCredit: number | null;
}

export default function ChargeItem({
  title,
  description,
  item,
  itemPrice,
  payType,
  updatePayType,
}: CreditItemProps) {
  const [selectedCredit, setSelectedCredit] = useState("5");
  const [currentItemPrice, setCurrentItemPrice] = useState(itemPrice);

  const calculateItemPrice = (selectedValue: string) => {
    const priceMultiplier = 100;
    const price = parseInt(selectedValue) * priceMultiplier + "원";
    setCurrentItemPrice(price);
    const newPayType: PayType = {
      ...payType,
      itemName: "크레딧 " + parseInt(selectedValue) + "개",
      totalAmount: parseInt(selectedValue) * priceMultiplier,
      taxFreeAmount: parseInt(selectedValue) * priceMultiplier * 0.1,
      chargeCredit: parseInt(selectedValue),
    };
    updatePayType(newPayType);
    return price;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCredit(selectedValue);
    return calculateItemPrice(selectedValue);
  };

  const { mutate } = useMutation(
    ["getKakaoUrl"],
    (payType: PayType) => getKakaoUrl(payType),
    {
      onSuccess: (data) => {
        getKakaoPopup(data.next_redirect_pc_url);
      },
      onError: (error) => alert("결제 서버에 문제가 발생했습니다"),
    }
  );
  // const openKakaopayPopup = async (payType: PayType) => {
  //   try {
  //     const kakaoResponse = await getKakaoUrl(payType);
  //     if (kakaoResponse && kakaoResponse.next_redirect_pc_url) {
  //       getKakaoPopup(kakaoResponse.next_redirect_pc_url);
  //     } else {
  //       alert("결제 서버에 문제가 발생했습니다.");
  //     }
  //   } catch (error) {
  //     alert("결제 서버에 문제가 발생했습니다.");
  //   }
  // };

  return (
    <div className="w-[300px] h-[500px] flex flex-col gap-1 border-2 border-grayscale7 m-2 p-10 text-center dark:border-grayscale1">
      <h2>{title}</h2>
      <br />
      <p>{description}</p>
      <br />
      <div>
        {item === "단건 크레딧" ? (
          <div>
            <select value={selectedCredit} onChange={handleSelectChange}>
              <option value="5">5크레딧</option>
              <option value="10">10크레딧</option>
              <option value="15">15크레딧</option>
              <option value="20">20크레딧</option>
            </select>
          </div>
        ) : (
          <p>{item}</p>
        )}
      </div>
      <br />
      <p className="text-end">{currentItemPrice}</p>
      <br />
      <button
        className="my-10 px-10 py-5 text-grayscale1 bg-secondary1 rounded-lg dark:bg-secondary2"
        onClick={() => mutate(payType)}
      >
        구매하기
      </button>
    </div>
  );
}
