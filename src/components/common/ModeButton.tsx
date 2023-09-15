import React from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {darkMode} from "../../recoil/atoms/common";
import {useRecoilState} from "recoil";

export default function ModeButton() {
    const [isDark, setIsDark] = useRecoilState(darkMode);

    const handleModeChange = () => {
        setIsDark((cur: any) => !cur);
    }
    return <div className="bg-grayscale2 rounded-full w-20 h-20 p-4 fixed bottom-5 right-5 dark:bg-grayscale5" onClick={handleModeChange}>
        {isDark ? <WbSunnyIcon sx={{ fontSize: "50px", color: "#FFFFFF" }} /> : <DarkModeIcon sx={{ fontSize: "50px", color: "#000000" }} />}
    </div>
}