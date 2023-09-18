import React, { useState, useRef } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import GobackContainer from "../../components/Common/GobackContainer";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import BottomSheet from "../../components/MainPage/BottomSheet";
import smallFind from "../../assets/img/smallFind.svg";
import grayHeart from "../../assets/img/grayHeart.svg";
import grayStar from "../../assets/img/grayStar.svg";
import grayMoney from "../../assets/img/grayMoney.svg";
import grayHanger from "../../assets/img/grayHanger.svg";
import logo from "../../assets/img/logo.svg"

import sample from "../../assets/img/sample.svg";
import PostMainImg from "../../components/MainPage/PostMainImg";

const Filters = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

`;

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
`;

const SearchInput = styled.input`
  width: calc(100% - 30px);
  border: none;
  outline: none;
  cursor: pointer;
`;

const PopularContainer = styled.div`

`
const PostList=styled.div`
  display: flex;
  gap: 16px;  
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`

const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handelMouseDownEvent = (e) => {
    setDragging(true);
    if(containerRef.current){
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handelMouseMoveEvent = (e) => {
    if(!dragging) return;

    e.preventDefault();

    if(containerRef.current){
      const walk = e.pageX - clickPoint;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }

  const openBottomSheet = () => {
    setIsOpen(true);
  }
  
  return (

    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          <SearchBox>
            <img src={smallFind}/>
            <SearchInput placeholder="찾고있는 스타일이 있나요?" onClick={openBottomSheet}/>
          </SearchBox>
          <Filters ref={containerRef}
            onMouseDown={handelMouseDownEvent}
            onMouseLeave={() => setDragging(false)}
            onMouseUp={() => setDragging(false)}
            onMouseMove={handelMouseMoveEvent}>
            <BigStyleCategoryBox icon={grayHeart} content={'좋아요 많은 순'}/>
            <BigStyleCategoryBox icon={grayStar} content={'별점 높은 순'}/>
            <BigStyleCategoryBox icon={grayMoney}  content={'가격 낮은 순'}/>
            <BigStyleCategoryBox icon={grayHanger} content={'코디 횟수 높은 순'}/>
          </Filters>
          
          {/* 코디네이터 프로필 */}
          <>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"웜톤 천재 아우터"}/>
            </Link>
            <PopularContainer>
                <PostList ref={containerRef}
                onMouseDown={handelMouseDownEvent}
                onMouseLeave={() => setDragging(false)}
                onMouseUp={() => setDragging(false)}
                onMouseMove={handelMouseMoveEvent}>
                <Link to="/postdetail">
                    <PostMainImg image={logo} name={'미니멀코디'} like={12340}/>
                </Link> 
                <Link to="/postdetail">
                    <PostMainImg image={sample} name={'비지니스 캐주얼 코디'} like={12340}/>
                </Link>
                <Link to="/postdetail">
                    <PostMainImg image={logo} name={'시티보이 코디'} like={12340}/>
                </Link>
                </PostList>
          </PopularContainer>
          </>
        </f.ScreenComponent>
      </f.SubScreen>
      {isOpen ? <BottomSheet openState={setIsOpen} isOpen={isOpen}/> : <Navigation type={'search'}/> }
      
    </f.Totalframe>
  );
};

export default SearchFilter;
