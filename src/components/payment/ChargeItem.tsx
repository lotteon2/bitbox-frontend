import React, { useState } from "react";

interface CreditItemProps {
  title: string;
  description: string;
  item: string;
  itemPrice: string;
  buttonUrl: string;
}

export default function ChargeItem({
  title,
  description,
  item,
  itemPrice,
  buttonUrl,
}: CreditItemProps) {
  const [selectedCredit, setSelectedCredit] = useState("5");
  const [currentItemPrice, setCurrentItemPrice] = useState(itemPrice);

  const calculateItemPrice = (selectedValue: string) => {
    const priceMultiplier = 100;
    const price = parseInt(selectedValue) * priceMultiplier + "원";
    setCurrentItemPrice(price);
    return price;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCredit(selectedValue);
    return calculateItemPrice(selectedValue);
  };

  const openPopup = () => {
    const width = 800;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const popupWindow = window.open(
      buttonUrl,
      "Popup",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );

    if (popupWindow) {
      popupWindow.focus();
    } else {
      alert("팝업 차단이 활성화되어 있습니다. 팝업 차단을 비활성화해주세요.");
    }
  };

  return (
    <div className="w-[300px] h-[500px] flex flex-col gap-1 border-2 border-grayscale7 m-2 p-10 text-center dark:border-grayscale1">
      <h2>{title}</h2>
      <br />
      <p>{description}</p>
      <br />
      <p>
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
      </p>
      <br />
      <p className="text-end">{currentItemPrice}</p>
      <br />
      <button
        className="my-10 px-10 py-5 text-grayscale1 bg-secondary1 rounded-lg dark:bg-secondary2"
        onClick={openPopup}
      >
        구매하기
      </button>
    </div>
  );
}
