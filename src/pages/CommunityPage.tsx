import React, { useState } from "react";

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const subCategory = ["✨   전체", "🤔   질문있어요", "🫂   공유해요"];
  const search : string = ""

  return (
    <div className="flex flex-row my-10">
      <div className="w-3/12 mr-10">
        <div className="w-full h-full dark:text-grayscale1">
          <div className="font-extrabold text-3xl ml-2">커뮤니티</div>
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
      <div className="w-full px-5 ml-20 mt-20">
          <div
              className="w-full h-9 left-36 top-9 bg-gray-300 rounded-xl mb-10"
          >
              <input
                  className="w-full h-full rounded-xl bg-transparent outline-none px-2"
                  type="text"
                  placeholder="🔍 검색어를 입력하세요"
              />
          </div>
      {selectedCategory === 0
          ? (
              <div>
                  <div>카테고리1</div>
                  <div>카테고리2</div>
                  <div>카테고리n개 동적 생성</div>
              </div>
          )
        : selectedCategory === 1
        ? (
            <>
                <div>
                    <div>질문있어요</div>
                </div>
                <div>공유해요</div>
            </>
              )
        : (
            <>

            </>
              )
      }
      </div>
    </div>
  );
}
