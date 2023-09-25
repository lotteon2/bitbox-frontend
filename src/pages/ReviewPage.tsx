import React, { useState } from "react";

export default function ReviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const subCategory = ["✨   전체", "✍️   면접후기", "🤫   꿀팁공유"];

  return (
    <div className="flex flex-row my-10">
      <div className="w-[230px] mr-10">
        <div className="w-full h-full dark:text-grayscale1">
          <div className="font-extrabold text-3xl ml-2">선배들의 이야기</div>
          {/* TODO: 나중에 여기 카테고리 PK를 key 값으로 설정 후 index를 갈아 끼워줘야됨 */}
          <div className="font-bold text-2xl mt-10 cursor-pointer">
            {subCategory.map((sub: string, index: number) => (
              <div
                key={index}
                className={
                  index === selectedCategory
                    ? "py-5 px-10 rounded-xl bg-primary1 dark:bg-primary4"
                    : "py-5 px-10 rounded-xl"
                }
                onClick={() => setSelectedCategory(index)}
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCategory === 0
        ? "전체"
        : selectedCategory === 1
        ? "면접후기"
        : "꿀팁공유"}
    </div>
  );
}
