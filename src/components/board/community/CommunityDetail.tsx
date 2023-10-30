import { useParams } from "react-router-dom";

export default function CommunityDetail() {
  const boardId = useParams().boardId;

  return <div>게시글 상세{boardId}</div>;
}
