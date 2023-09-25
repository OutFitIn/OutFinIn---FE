import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as n from "./NavigationStyle";
import Home from '../../assets/img/navigationIcon/home.svg';
import FillHome from '../../assets/img/navigationIcon/fillHome.svg';
import Search from '../../assets/img/navigationIcon/search.svg';
import FillSearch from '../../assets/img/navigationIcon/fillSearch.svg';
import Chat from '../../assets/img/navigationIcon/chat.svg';
import FillChat from '../../assets/img/navigationIcon/fillChat.svg'

import MyPage from "../../assets/img/navigationIcon/mypage.svg";
import FillMyPage from "../../assets/img/navigationIcon/fillMyPage.svg";
const Navigation = (props) => {
    const [selectIcon, setSelectIcon] = useState("Home");

    useEffect(() => {
        setSelectIcon(props.type);
    }, [props.type])

    return(
        <n.TotalNavigation>
            {/* 홈-코디네이터, 유저냐에 따라 달라짐 */}
            <Link to={localStorage.getItem('mode') == 1 ? "/outermainpage" : "/usermainpage"}>
                <n.SubNavigation 
                    marginRight='45px'
                    isSelected={selectIcon === 'Home'}>
                    <img src={selectIcon === 'Home' ? FillHome : Home}/>
                    <n.IconText>홈</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 검색 */}
            <Link to='/search'>
                <n.SubNavigation
                    marginRight='45px'
                    isSelected={selectIcon === 'search'}>
                    <img src={selectIcon === 'search' ? FillSearch : Search} ></img>
                    <n.IconText>검색</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 채팅 */}
            <Link to={localStorage.getItem('mode') == 1 ? '/chatlist': '/userchatlist'}>
                <n.SubNavigation
                    marginRight='45px'
                    isSelected={selectIcon === 'chat'}
                    >
                    <img src={selectIcon === 'chat' ? FillChat : Chat} ></img>
                    <n.IconText>채팅</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 마이 -코디네이터, 유저냐에 따라 달라짐*/}
            <Link to={localStorage.getItem('mode') == 1 ? "/outermypage" : "/usermypage" }>
                <n.SubNavigation 
                    isSelected={selectIcon === 'mypage'}
                >
                    <img src={selectIcon === 'mypage' ? FillMyPage : MyPage} ></img>
                    <n.IconText>마이</n.IconText>
                </n.SubNavigation>
            </Link>
        </n.TotalNavigation>
    )
}
export default Navigation;