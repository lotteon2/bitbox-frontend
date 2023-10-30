import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCategoryList } from "../apis/community/community";
import Loading from "./Loading";
import AlumniList from "../components/board/alumni/AlumniList";

interface categoryType {
  categoryId: number;
  categoryName: string;
}

export default function ReviewPage() {
  const [categories, setSelectedCategory] = useState<number>(0);
  const [allCategories, setAllCategories] = useState<categoryType[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryListAlumni"],
    queryFn: () => getCategoryList(2),
  });

  useEffect(() => {
    if (data && categories === 0) {
      const tmpCategories: categoryType[] = [];
      tmpCategories.push({
        categoryId: 2,
        categoryName: "✨ 전체",
      });
      data.forEach((item: categoryType) => {
        const category = {
          categoryId: item.categoryId,
          categoryName: item.categoryName,
        };
        tmpCategories.push(category);
      });

      setAllCategories(tmpCategories);
      setSelectedCategory(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (data === undefined || isLoading) return <Loading />;

  return (
    <div className="flex flex-row my-10">
      <div className="w-[300px] mr-10">
        <div className="w-full h-full dark:text-grayscale1">
          <div className="font-extrabold text-3xl ml-2">알럼나이</div>
          <div className="font-bold text-2xl mt-10 cursor-pointer">
            {allCategories.map((item: categoryType) => (
              <div
                key={item.categoryId}
                className={
                  item.categoryId === categories
                    ? "py-5 px-10 rounded-xl bg-primary1 dark:bg-primary4"
                    : "py-5 px-10 rounded-xl"
                }
                onClick={() => setSelectedCategory(item.categoryId)}
              >
                {item.categoryName}
              </div>
            ))}
          </div>
        </div>
      </div>
      <AlumniList categoryId={categories} />
    </div>
  );
}
