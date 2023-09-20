import React, { useState } from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { darkmodeState, loginState } from "../../recoil/atoms/common";
import {useRecoilState, useRecoilValue} from "recoil";

import Logo from "../../assets/images/logo.png";
import LogoDark from "../../assets/images/logo_dark.png";

interface parameter {
    istoggled: string,
    usertoggled: string
}

const HeaderStyle = styled.div<parameter>`
  max-width: 1320px;
  padding: 20px 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin: 0 1rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size: 1.3rem;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 800px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props: parameter) => (props.usertoggled === "true" ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
    }

    .header__menulist {
      display: ${(props: parameter) => (props.istoggled === "true" ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;

export default function Header() {
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const [userToggled, setUserToggled] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const isDark = useRecoilValue<boolean>(darkmodeState);

    const defaultUserMenuList = ["로그인", "회원가입"];
    const authUserMenuList = ["마이페이지", "로그아웃"];

    const activeStyle = {
        borderBottom: '3px solid #F92525'
    }
    return (
        <HeaderStyle istoggled={isToggled.toString()} usertoggled={userToggled.toString()}>
             {/*햄버거 버튼 */}
            <div
                className="toggle"
                onClick={() => {
                    setIsToggled(!isToggled);
                }}
            >
                <FontAwesomeIcon className="dark:text-grayscale1" icon={!isToggled ? faBars : faTimes} />
            </div>

            {/* 로고 */}
            {isDark ? <img className="w-[60px]" src={LogoDark} /> : <img className="w-[60px]" src={Logo} />}

            {/* User 버튼 */}
            <div
                className="user"
                onClick={() => {
                    setUserToggled(!userToggled);
                }}
            >
                <FontAwesomeIcon className="dark:text-grayscale1" icon={!userToggled ? faUser : faTimes} />
            </div>

            {/* 메뉴 리스트 */}
            <ul className="header__menulist">
                <li className="font-bold dark:text-grayscale1"><NavLink style={({isActive}) => (isActive ? activeStyle : {})} to="/devlog">데브로그</NavLink></li>
                <li className="font-bold dark:text-grayscale1"><NavLink style={({isActive}) => (isActive ? activeStyle : {})} to="/community">커뮤니티</NavLink></li>
                <li className="font-bold dark:text-grayscale1"><NavLink style={({isActive}) => (isActive ? activeStyle : {})} to="/review">선배들의 이야기</NavLink></li>
                <li className="font-bold dark:text-grayscale1"><NavLink style={({isActive}) => (isActive ? activeStyle : {})} to="/alumni">알럼나이</NavLink></li>
            </ul>

            {/* User 메뉴 리스트 */}
            <ul className="header__right">
                {isLogin ? authUserMenuList.map((menuItem: string, index: number) => <li key={index} className="font-light dark:text-grayscale1">{menuItem}</li>) : defaultUserMenuList.map((menuItem: string, index: number) => <li key={index} className="font-light dark:text-grayscale1">{menuItem}</li>)}
            </ul>
        </HeaderStyle>
    );
}