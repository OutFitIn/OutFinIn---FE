import React, {useState} from 'react';
import * as n from "./NavigationStyle";
import {AiFillHome} from 'react-icons/ai';
import {AiOutlineSearch} from "react-icons/ai";
import {BsFillChatDotsFill, BsFillPersonFill} from 'react-icons/bs';

const Navigation = (props) => {
    const [selectIcon, setSelectIcon] = useState('Home')

    const changeIcon = (icon) =>{
        setSelectIcon(icon)
    }
    return(
        <n.TotalNavigation>
            {/* 홈 */}
            <n.SubNavigation 
                marginRight='45px'
                isSelected={selectIcon === 'Home'}
                onClick={() => changeIcon('Home')}
                >
                <AiFillHome size='35'/>
                <n.IconText>홈</n.IconText>
            </n.SubNavigation>
            {/* 검색 */}
            <n.SubNavigation
                marginRight='45px'
                isSelected={selectIcon === 'search'}
                onClick={() => changeIcon('search')}
                >
                <AiOutlineSearch size='35'/>
                <n.IconText>검색</n.IconText>
            </n.SubNavigation>
            {/* 채팅 */}
            <n.SubNavigation
                marginRight='45px'
                isSelected={selectIcon === 'chat'}
                onClick={() => changeIcon('chat')}
                >
                <BsFillChatDotsFill size='30'/>
                <n.IconText>채팅</n.IconText>
            </n.SubNavigation>
            {/* 마이 */}
            <n.SubNavigation 
                isSelected={selectIcon === 'mypage'}
                onClick={() => changeIcon('mypage')}
            >
                <BsFillPersonFill size='35'/>
                <n.IconText>마이</n.IconText>
            </n.SubNavigation>
        </n.TotalNavigation>
    )
}
export default Navigation;