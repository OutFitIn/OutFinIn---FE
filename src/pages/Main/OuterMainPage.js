import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import plus from '../../assets/img/plus.svg';
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import Navigation from "../../components/Navigation/Navigation";

const MainText = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 9.12vh;
  margin-bottom: 1.65vh;
`;

const HashTag = styled.div`
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`;

const CoordinatorProfile = styled.div`
  margin-top:3.08vh;
`;

const WriteButtonContainer=styled.div`
  position: absolute;
  right: 10px;
  bottom: 85px;
`

const OuterMainPage = () => {
    const [selectStyle, setSelectStyle] = useState('이지캐주얼');
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
    const changeStyle = (style) => {
      setSelectStyle(style);
    }

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
            {/* header */}
            <MainText>인기 아우터들의<br/>코디를 둘러보세요 👀</MainText>
            <HashTag ref={containerRef}
                onMouseDown={handelMouseDownEvent}
                onMouseLeave={() => setDragging(false)}
                onMouseUp={() => setDragging(false)}
                onMouseMove={handelMouseMoveEvent}>
                <BigStyleCategoryBox content={'#미니멀'} onClick={() => changeStyle('미니멀')} isSelected={selectStyle === '미니멀'} />
                <BigStyleCategoryBox content={'#이지캐주얼'} onClick={() => changeStyle('이지캐주얼')} isSelected={selectStyle === '이지캐주얼'} />
                <BigStyleCategoryBox content={'#스트릿'} onClick={() => changeStyle('스트릿')} isSelected={selectStyle === '스트릿'}/>
                <BigStyleCategoryBox content={'#봄 코디'} onClick={() => changeStyle('봄 코디')} isSelected={selectStyle === '봄 코디'}/>
                <BigStyleCategoryBox content={'+'}/>
          </HashTag>
          {/* 코디네이터 프로필 */}
          <CoordinatorProfile>
            <Link to='/outerprofile' name={"웜톤 천재 아우터"}>
              <CoordinatorInfo name={"웜톤 천재 아우터"}/>
            </Link>
            <Link to='/outerprofile' name={"내가 짱"}>
              <CoordinatorInfo name={"내가 짱"}/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"내 이름은 안지수"}/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"나는 이소윤"}/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"디자인 천재 이수정"}/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"슴우디 레츠고"}/>
            </Link>
          </CoordinatorProfile>
          {/* 글 작성 버튼 */}
          <WriteButtonContainer>
            <Link to="/writenewpost">
                <img src={plus} />
            </Link>
          </WriteButtonContainer>

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default OuterMainPage;