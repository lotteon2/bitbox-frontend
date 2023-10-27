export default function BoardCategory({ categoryId, categoryName }: any) {
  return (
    <span
      className={`${
        categoryId === 5
          ? "bg-sky-700"
          : categoryId === 6
          ? "bg-red-700"
          : categoryId === 7
          ? "bg-yellow-700"
          : categoryId === 8
          ? "bg-green-700"
          : "bg-purple-700"
      } 'my-4 py-2 px-6 rounded-md text-center text-xl text-white font-thin'`}
    >
      {categoryName}
    </span>
  );
}
