import { PropsWithChildren } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function ChattingListModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 dark:bg-grayscale6">
      <header className="w-full h-10 bg-primary7 rounded-xl rounded-b-none p-2 text-grayscale1 dark:bg-primary4">
        <div className="relative w-[350px] h-[25px] ml-8 rounded-lg">
          <ClearIcon
            sx={{ color: "#FFFFFF", float: "right" }}
            onClick={onClickToggleModal}
          />
        </div>
      </header>
      <div className="p-2 dark:text-grayscale1">{children}</div>
    </div>
  );
}
