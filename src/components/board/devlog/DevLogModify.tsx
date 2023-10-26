import { useParams } from "react-router-dom";

export default function DevLogModify() {
  const param = useParams();
  console.log(param);
  return <div></div>;
}
