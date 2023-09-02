import React, {useState} from 'react';
import * as navigation from "./NavigationStyle";
import {AiFillHome} from 'react-icons/ai';
import {AiOutlineSearch} from "react-icons/ai";
import {BsFillChatDotsFill, BsFillPersonFill} from 'react-icons/bs';

const Navigation = (props) => {
    const [selectIcon, setSelectIcon] = useState('Home')

    const changeIcon = (icon) =>{
        setSelectIcon(icon)
    }
    return(
        <navigation.total_navigation>
            {/* 홈 */}
            <navigation.sub_navigation 
                marginRight='45px'
                isSelected={selectIcon === 'Home'}
                onClick={() => changeIcon('Home')}
                >
                <AiFillHome size='35'/>
                <navigation.icon_text>홈</navigation.icon_text>
            </navigation.sub_navigation>
            {/* 검색 */}
            <navigation.sub_navigation
                marginRight='45px'
                isSelected={selectIcon === 'search'}
                onClick={() => changeIcon('search')}
                >
                <AiOutlineSearch size='35'/>
                <navigation.icon_text>검색</navigation.icon_text>
            </navigation.sub_navigation>
            {/* 채팅 */}
            <navigation.sub_navigation
                marginRight='45px'
                isSelected={selectIcon === 'chat'}
                onClick={() => changeIcon('chat')}
                >
                <BsFillChatDotsFill size='30'/>
                <navigation.icon_text>채팅</navigation.icon_text>
            </navigation.sub_navigation>
            {/* 마이 */}
            <navigation.sub_navigation 
                isSelected={selectIcon === 'mypage'}
                onClick={() => changeIcon('mypage')}
            >
                <BsFillPersonFill size='35'/>
                <navigation.icon_text>마이</navigation.icon_text>
            </navigation.sub_navigation>
        </navigation.total_navigation>
    )
}
export default Navigation;