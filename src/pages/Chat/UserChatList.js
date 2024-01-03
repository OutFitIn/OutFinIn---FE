import React, { useState,useRef,useEffect } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import smallFind from "../../assets/img/smallFind.svg";
import UserInfo from "../../components/Chat/UserInfo";
import axios from "axios";

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  vertical-align: middle;
  white-space: nowrap;
  padding: 7px 0px 7px 10px;
  border-radius: 20px;
  border: 1px solid #ADAAAF;
  margin-top:2.72vh;
  margin-bottom: 0.94vh;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: calc(100% - 30px);
  border: none;
  outline: none;
  cursor: pointer;
`;
const ButtonContainer=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 10px auto;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #C8C5D0;
`
const Button=styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  opacity: 0.8;
  background: ${(props)=>(props.isSelected? '#E3DFFF':'#F3EFF4')};
  color: ${(props)=>(props.isSelected? '#100069':'#000')};
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
  cursor: pointer;
`

const UserChatList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState('');

  const openBottomSheet = () => {
    setIsOpen(true);
  }

  const handleClicked = (list) => {
    setSelectedList(list);
  }

  // 추가 - 준형

  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    async function fetchChatRoom() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://ofi-ofi.koyeb.app/chat/main");
        setChatRoomList(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchChatRoom();
  }, [])

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 검색창 */}
          <SearchBox>
            <img src={smallFind} />
            <SearchInput placeholder="검색" onClick={openBottomSheet} />
          </SearchBox>
          {/* 코디 완료 여부 구분 */}
          <ButtonContainer>
            <Button onClick={() => handleClicked('코디의뢰')} isSelected={selectedList === '코디의뢰'}>코디 의뢰한 피터</Button>
            <Button onClick={() => handleClicked('코디완료')} isSelected={selectedList === '코디완료'}>코디 완료한 피터</Button>
          </ButtonContainer>
          {/* 채팅 목록 */}
          {chatRoomList?.map((list) => (
            <Link to={`/userchatroom/${list.room_id}/${list.user[0].nickname}/${list.coordinator[0].nickname}`}>
              <UserInfo 
                name={list.coordinator[0].nickname}
                height={list.coordinator[0].height} 
                weight={list.coordinator[0].weight} 
                content={list.coordinator[0].content}>                 
              </UserInfo>
            </Link>
          ))}

          {/* <Link to="/chatroom">
            <UserInfo name={'뉴비피터'} height={163} weight={63} bodyshape={'스트레이트'} content="저는 이런 코디를 받고 싶습니다. 뉴비 피터 / 163cm / 63kg / 스트레이트. 제 정보입니다."></UserInfo>
          </Link>
          <Link to="/chatroom">
            <UserInfo name={'소유니'} height={170} weight={12} bodyshape={'웨이브'} content="저는 이런 코디를 받고 싶습니다. 소유니 / 163cm / 63kg / 스트레이트. 제 정보입니다."></UserInfo>
          </Link>
          <Link to="/chatroom">
            <UserInfo name={'지츄입니덩~'} height={163} weight={63} bodyshape={'스트레이트'} content="저는 이런 코디를 받고 싶습니다. 지츄입니덩~ / 163cm / 63kg / 스트레이트. 제 정보입니다."></UserInfo>
          </Link>
          <Link to="/chatroom">
            <UserInfo name={'디자인천재 수정이라'} height={163} weight={63} bodyshape={'스트레이트'} content="저는 이런 코디를 받고 싶습니다. 뉴비 피터 / 163cm / 63kg / 스트레이트. 제 정보입니다."></UserInfo>
          </Link> */}
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'chat'} />
    </f.Totalframe>
  );
};

export default UserChatList;