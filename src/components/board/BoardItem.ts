export default interface BoardItem {
  content: {
    boardId: number;
    memberId: string;
    memberName: string;
    categoryId: number;
    categoryName: string;
    boardTitle: string;
    boardContents: string;
    createdAt: string;
    deleted: boolean;
  }[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
