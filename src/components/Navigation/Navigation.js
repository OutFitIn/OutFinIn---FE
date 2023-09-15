import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import * as n from "./NavigationStyle";
import Home from '../../assets/img/navigationIcon/home.svg';
import Search from '../../assets/img/navigationIcon/search.svg';
import Chat from '../../assets/img/navigationIcon/chat.svg';
import MyPage from "../../assets/img/navigationIcon/mypage.svg";

const Navigation = (props) => {
    const [selectIcon, setSelectIcon] = useState('Home')

    const changeIcon = (icon) =>{
        setSelectIcon(icon)
    }
    return(
        <n.TotalNavigation>
            {/* 홈-코디네이터, 유저냐에 따라 달라짐 */}
            <Link to='/outermainpage'>
                <n.SubNavigation 
                    marginRight='45px'
                    isSelected={selectIcon === 'Home'}
                    onClick={() => changeIcon('Home')}>
                    <img src={Home}/>
                    <n.IconText>홈</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 검색 */}
            <Link to='/search'>
                <n.SubNavigation
                    marginRight='45px'
                    isSelected={selectIcon === 'search'}
                    onClick={() => changeIcon('search')}
                    >
                    <img src={Search}/>
                    <n.IconText>검색</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 채팅 */}
            <Link to='/chat'>
                <n.SubNavigation
                    marginRight='45px'
                    isSelected={selectIcon === 'chat'}
                    onClick={() => changeIcon('chat')}
                    >
                    <img src={Chat}/>
                    <n.IconText>채팅</n.IconText>
                </n.SubNavigation>
            </Link>
            {/* 마이 -코디네이터, 유저냐에 따라 달라짐*/}
            <Link to='/outermypage'>
                <n.SubNavigation 
                    isSelected={selectIcon === 'mypage'}
                    onClick={() => changeIcon('mypage')}
                >
                    <img src={MyPage}/>
                    <n.IconText>마이</n.IconText>
                </n.SubNavigation>
            </Link>
        </n.TotalNavigation>
    )
}
export default Navigation;