import React, {PropsWithChildren, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useSetRecoilState} from "recoil";
import {chatroomState} from "../../../recoil/atoms/common";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

export default function ChattingDetailModal({onClickToggleModal, children}: PropsWithChildren<ModalDefaultType>) {
    const setIsChat = useSetRecoilState(chatroomState);
    const [searchWord, setSearchWord] = useState("");

    const handleSearchWord = (e: any) => {
        setSearchWord(e.target.value)
    }

    const handleResetSearchWord = () => {
        console.log("reset")
        setSearchWord('');
    }

    const handleChatState = () => {
        setIsChat((cur) => !cur);
    }

    return <div className="fixed w-[400px] h-[600px] bottom-28 right-4 rounded-xl shadow-lg bg-grayscale1 dark:bg-grayscale6">
        <header className="w-full h-10 bg-primary7 rounded-xl rounded-b-none p-2 text-grayscale1 dark:bg-primary4">
            <ChevronLeftIcon sx={{color: "#FFFFFF", float: 'left', zIndex: 10}} onClick={handleChatState}/>
            <div className="relative w-[350px] h-[25px] ml-8">
                <input className="bg-grayscale1 w-[200px] h-[25px] ml-28 rounded-sm text-grayscale7 outline-0" type="text" value={searchWord} onChange={handleSearchWord}/>
                <span className="bg-grayscale1 w-[24px] h-[25px] rounded-sm absolute right-14"><CancelIcon sx={{color: "#C6C6C6", fontSize: 18}} onClick={handleResetSearchWord}/></span>
                <span className="bg-grayscale1 w-[30px] h-[25px] rounded-sm absolute right-7"><SearchIcon sx={{color: "#F92525", fontSize: 28}} /></span>
                <ClearIcon sx={{color: "#FFFFFF", float: 'right'}} onClick={onClickToggleModal} />
            </div>
        </header>
        <div className="p-2 dark:text-grayscale1">{children}</div>
    </div>
}