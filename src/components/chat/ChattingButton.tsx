import ChatIcon from "../../assets/images/chat.png";
import ChatDarkIcon from "../../assets/images/chat_dark.png";
import {
  darkmodeState,
  chatState,
  chatroomState,
} from "../../recoil/atoms/common";
import { useRecoilState, useRecoilValue } from "recoil";
import ChattingDetailModal from "./ChattingDetailModal";
import ChattingListModal from "./ChattingListModal";
import Badge from "@mui/material/Badge";
import { chattingCountState } from "../../recoil/atoms/chatting";

export default function ChattingButton() {
  const isDark = useRecoilValue(darkmodeState);
  const isChatRoom = useRecoilValue(chatroomState);
  const [isChat, setIsChat] = useRecoilState<boolean>(chatState);
  const chattingCount = useRecoilValue<number>(chattingCountState);

  const handleChatModalOpen = () => {
    setIsChat((cur) => !cur);
  };

  return (
    <div className="relative">
      <div
        className="bg-primary7 rounded-full w-20 h-20 p-4 fixed bottom-5 right-32 z-20 dark:bg-primary4"
        onClick={handleChatModalOpen}
      >
        <Badge
          color="success"
          overlap="circular"
          badgeContent={chattingCount}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: 15,
              height: 30,
              width: 30,
              borderRadius: "50%",
              marginRight: "-10px",
              marginTop: "-15px",
            },
          }}
        >
          {isDark ? (
            <img src={ChatDarkIcon} alt="" />
          ) : (
            <img src={ChatIcon} alt="" />
          )}
        </Badge>
      </div>

      <ChattingDetailModal
        onClickToggleModal={() => setIsChat((cur) => !cur)}
      />
    </div>
  );
}
