import React, { useState } from "react";

export default function BoardSideHeader() {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    // TODO: 나중에 API 연결해서 메인 카테고리 이름 & 서브 카테고리 이름 가져오기
    const mainCategory = "선배들의 이야기";
    const subCategory = ["✨   전체", "✍️   면접후기", "🤫   꿀팁공유"];

    return <div className="w-full h-full">
        <div className="font-extrabold text-3xl ml-2">{mainCategory}</div>
        {/* TODO: 나중에 여기 카테고리 PK를 key 값으로 설정 후 index를 갈아 끼워줘야됨 */}
        <div className="font-bold text-2xl mt-10 cursor-pointer">{subCategory.map((sub: string, index: number) =>
            <div key={index} className={index === selectedCategory ? "py-5 px-10 rounded-xl bg-primary1" : "py-5 px-10 rounded-xl"} onClick={() => setSelectedCategory(index)}>{sub}</div>)}
        </div>
        </div>
}