import React, { useState } from "react";

export default function AlumniPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const subCategory = ["✨   전체", "🔊   모두모여라"];
  // TODO: 여기 생성된 반 전체 개수 가져와서 subCategory에 N기 게시판 넣어주기
  const classCount = 2;
  for (let i = 1; i <= classCount; i++) {
    subCategory.push("❤️   " + i + "기 모여라");
  }

  return (
    <div className="flex flex-row my-10">
      <div className="w-[230px] mr-10">
        <div className="w-full h-full dark:text-grayscale1">
          <div className="font-extrabold text-3xl ml-2">알럼나이</div>
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
        ? "모두 모여라"
        : "N기 모여라"}
    </div>
  );
}
