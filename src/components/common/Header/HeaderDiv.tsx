import React, {useState} from "react";
import {BsArrowRight, BsX, BsList} from "react-icons/bs";
// import { NavLink } from "react-router-dom";
export default function Header() {
    const menu = ["Home", "About", "Services", "Contact us", "settings"];
    const [activeItems, setActiveItems] = useState("Home");
    const [toggleOpen, setToggleOpen] = useState(false);
    return (
        <>
            <nav className="md:flex hidden justify-between items-center bg-indigo-600 text-white w-full h-16 lg:px-20 md:px-10 ">
                <div className="text-2xl">
                    Logo
                </div>

                <ul className="flex">
                    {menu.map((menu) => (
                        <li className={activeItems===menu ? "mr-6 text-white font-bold" : "mr-6 text-indigo-400 hover:text-white transform duration-150" } >
                            {menu}
                        </li>))}
                </ul>
                <button className="mr-4 flex items-center text-lg bg-pink-500 pl-4 pr-2.5 py-1.5 text-white rounded-full hover:bg-pink-600 transform duration-150">
                    Sign up <BsArrowRight className="w-6 h-6 font-bold ml-2"/>
                </button>
            </nav>


            <nav className="md:hidden flex px-6 justify-between items-center w-full h-12 bg-indigo-600 text-white">
                <div className="text-xl">
                    Logo
                </div>
                {toggleOpen?
                    <BsX
                        className='w-8 h-8 p-1 hover:bg-slate-500 rounded-md bg-pink-600 hover:bg-pink-700 transform duration-150'
                        onClick={() => setToggleOpen(false)}/>
                    :
                    <BsList
                        className='w-8 h-8 p-1 hover:bg-slate-500 rounded-md bg-pink-600 hover:bg-pink-700 transform duration-150'
                        onClick={() => setToggleOpen(true)}/>
                }

            </nav>
            {toggleOpen? <ul className="block overflow-auto md:hidden w-full h-screen p-6 bg-indigo-600 ">
                {menu.map(menu => (
                    <li className={activeItems === menu ? "w-full py-2.5 text-white font-bold" : "w-full py-2.5 text-indigo-400"}>
                        {menu}
                    </li>))}
            </ul> : null}
        </>);
}