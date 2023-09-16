import React, { useState, useRef } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";  
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import BottomSheet from "../../components/MainPage/BottomSheet";
import smallFind from "../../assets/img/smallFind.svg";
import goback from "../../assets/img/goback.svg";
import grayHeart from "../../assets/img/grayHeart.svg";
import grayStar from "../../assets/img/grayStar.svg";
import grayMoney from "../../assets/img/grayMoney.svg";
import grayHanger from "../../assets/img/grayHanger.svg";

const MainText = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 2.72vh;
  margin-bottom: 2.01vh;
`;

const Filters = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

`;

const GobackContainer = styled.img`
  margin-top:36px;
  margin-bottom: 8px;
`;

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
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

const Search = () => {
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
          <GobackContainer src={goback}/>
          <SearchBox>
            <img src={smallFind}/>
            <SearchInput placeholder="찾고있는 스타일이 있나요?" onClick={openBottomSheet}/>
            {isOpen && <BottomSheet/>}
          </SearchBox>
          <Filters ref={containerRef}
            onMouseDown={handelMouseDownEvent}
            onMouseLeave={() => setDragging(false)}
            onMouseUp={() => setDragging(false)}
            onMouseMove={handelMouseMoveEvent}>
            <BigStyleCategoryBox icon={grayHeart} content={'좋아요 많은 순'}></BigStyleCategoryBox>
            <BigStyleCategoryBox icon={grayStar} content={'별점 높은 순'}/>
            <BigStyleCategoryBox icon={grayMoney}  content={'가격 낮은 순'}/>
            <BigStyleCategoryBox icon={grayHanger} content={'코디 횟수 높은 순'}/>
          </Filters>
          <MainText>이런 스타일은 어떠신가요? 👀</MainText>
          {/* 코디네이터 프로필 */}
          <>
            <Link to='/postdetail'>
              <CoordinatorMainImg/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"웜톤 천재 아우터"}/>
            </Link>
          </>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'search'}/>
    </f.Totalframe>
  );
};

export default Search;
