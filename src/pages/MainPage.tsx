import React from "react";
import Banner from "../components/main/Banner";
import Introduce from "../components/main/Introduce";
import Activity from "../components/main/Activity";
import MainDevLog from "../components/main/MainDevLog";

export default function MainPage() {
    return <div className="flex flex-col gap-10">
        <Banner />
        <Introduce />
        <Activity />
        <MainDevLog />
    </div>


}