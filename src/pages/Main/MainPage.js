import React, { useState,useRef } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import logo from '../../assets/img/logo.svg';
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';
import hanger from '../../assets/img/hanger.svg';
import star from '../../assets/img/star.svg';

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

const CoordinatorMainImg = styled.div`
  position:relative;
`;

const Heart = styled.img`
  position: absolute;
  top: 20px;
  right: 34px;
`

const Img = styled.img`
position:relative;
  width: 100%;
  height: 46.44vh;
  border-radius: 18px;
`;

const CoordinatorInfo = styled.div`
  display: flex;
  margin-top: 2.36vh;
  margin-bottom: 3vh;
`;

const CoordinatorImg = styled.img`
  width: 61px;
  height: 61px;
  border-radius: 45px;
`;

const CoordinatorSubInfo = styled.div`
  margin-left:14px;
`;

const CoordinatorName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.08px;
  margin-right: 8px;
`;

const Hanger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.048px;
  margin-right: 8px;
`;

const HangerImg = styled.img`
  margin-right: 5px;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.18px;
`;

const StarImg = styled.img`
  margin-right: 7px;
`;

const CategoryBox = styled.div`
  display: flex;
  margin-top: 1.18vh;
`


const Main = () => {
  const [selectStyle, setSelectStyle] = useState('이지캐주얼');
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [fillColor, setFillColor] = useState(heart);
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

  const ChangeColor = () => {
    setFillColor(fillColor === heart ? fillheart : heart)
  }

  return (
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
            <BigStyleCategoryBox content={'#스트릿'}/>
            <BigStyleCategoryBox content={'#봄 코디'}/>
            <BigStyleCategoryBox content={'+'}/>
          </HashTag>
          {/* 코디네이터 프로필 */}
          <CoordinatorProfile>
            <CoordinatorMainImg>
              <Img src={logo}/>
              <Heart src={fillColor} onClick={ChangeColor}></Heart>
            </CoordinatorMainImg>
            <CoordinatorInfo>
                <CoordinatorImg src={logo}></CoordinatorImg>
                <CoordinatorSubInfo>
                  <f.Flex>
                    <CoordinatorName>웜톤천재 아우터</CoordinatorName>
                    <Hanger>
                      <HangerImg src={hanger}></HangerImg>
                      의뢰 13번
                    </Hanger>
                    <Star>
                      <StarImg src={star}></StarImg>
                      4.95
                    </Star>
                  </f.Flex>
                  <CategoryBox>
                    <SmallStyleCategoryBox content={'#미니멀'}></SmallStyleCategoryBox>
                    <SmallStyleCategoryBox content={'#시티보이'}></SmallStyleCategoryBox>
                    <SmallStyleCategoryBox content={'#비즈니스캐주얼'}></SmallStyleCategoryBox>
                  </CategoryBox>
                </CoordinatorSubInfo>
            </CoordinatorInfo>
          </CoordinatorProfile>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
  );
};

export default Main;
