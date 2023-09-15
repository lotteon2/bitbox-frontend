import React, {useCallback, useState} from "react";
import ChatIcon from "../../assets/images/chat.png";
import ChatDarkIcon from "../../assets/images/chat_dark.png";
import {darkMode, chatState} from "../../recoil/atoms/common";
import {useRecoilValue} from "recoil";
import ChattingDetailModal from "./ChattingDetailModal";
import ChattingListModal from "./ChattingListModal";

export default function ChattingButton() {
    const isDark = useRecoilValue(darkMode);
    const ischat = useRecoilValue(chatState);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const onClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal);
    }, [isOpenModal]);

    const handleChatModalOpen = () => {
        setOpenModal((cur) => !cur);
    }

    return <div className="relative">
        <div className="bg-primary7 rounded-full w-20 h-20 p-4 fixed bottom-5 right-32 dark:bg-primary4" onClick={handleChatModalOpen}>
            {isDark ? <img src={ChatDarkIcon} alt="" /> : <img src={ChatIcon} alt="" />}
        </div>
        {isOpenModal && (ischat ? <ChattingListModal onClickToggleModal={onClickToggleModal}>
            {/*TODO: 아래 div에 채팅방 목록 구성*/}
            <div>목록</div>
        </ChattingListModal> : <ChattingDetailModal onClickToggleModal={onClickToggleModal}>
            {/*TODO: 아래 div에 채팅방 상세 구성*/}
            <div>상세</div>
        </ChattingDetailModal>)}
    </div>
}