interface category {
  categoryId: number;
  categoryName: string;
}
export default function CategoryBadge(category: category) {
  const id = category.categoryId;
  const name = category.categoryName;

  return (
    <span
      className={`px-6 py-2 rounded-xl text-grayscale1 ml-[-20px] ${
        id === 5
          ? "bg-sky-700"
          : id === 6
          ? "bg-green-500"
          : id === 7
          ? "bg-yellow-400"
          : id === 8
          ? "bg-purple-700"
          : "bg-red-400"
      }`}
    >
      {name}
    </span>
  );
}
