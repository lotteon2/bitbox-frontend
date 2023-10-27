import React, { useState } from "react";
import CommunityList from "../components/board/community/CommunityList";
import BoardList from "../components/board/BoardList";

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const subCategory = ["✨   전체", "🤔   질문있어요", "🫂   공유해요"];
  // const search: string = "";

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
      <div className="w-full px-5 ml-20 mt-3">
        <div className="flex flex-row">
          <div className="w-[80%] h-9 rounded-xl mb-10">
            <input
              className="w-full h-full rounded-xl border-2 border-grayscale3 outline-none px-2 mt-5"
              type="text"
              placeholder="🔍 검색어를 입력하세요"
            />
          </div>
          <div className="bg-primary7 w-28 my-4 py-2 rounded-md text-center text-xl text-white font-normal ml-auto">
            글쓰기 🖍
          </div>
        </div>

        {selectedCategory === 0 ? (
          <>
            <div>
              <CommunityList />
            </div>
          </>
        ) : selectedCategory === 1 ? (
          <>
            <div>
              <BoardList categoryId={5} />
            </div>
            {/* <div className="h-0.5 my-5 bg-gray-300"></div>
              <div className="bg-sky-700 w-32 my-4 py-1 px-4 rounded-md text-center text-xl text-white font-thin">
                질문있어요
              </div>
              <div className="text-lg font-medium m-2">게시글 제목</div>
              <div className="text-lg font-light mx-2">게시글 내용</div> */}
          </>
        ) : (
          <>
            <div>
              <div className="h-0.5 my-5 bg-gray-300"></div>
              <div className="bg-sky-900 w-32 my-4 py-1 px-4 rounded-md text-center text-xl text-white font-thin">
                공유해요
              </div>
              <div className="text-lg font-medium m-2">게시글 제목</div>
              <div className="text-lg font-light mx-2">게시글 내용</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
