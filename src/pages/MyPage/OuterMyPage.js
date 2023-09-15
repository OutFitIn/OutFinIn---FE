import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import PostMainImg from "../../components/MainPage/PostMainImg";
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import Grades from "../../components/MainPage/Grades";

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";
import goback from "../../assets/img/goback.svg"

const GobackContainer=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
`

const Category = styled.div`
  margin-top: 15px;
  margin-bottom: 11px;
  color: #000;
  font-family: Noto Sans CJK KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
`;

const PopularContainer=styled.div`
`
const EveryContainer=styled.div`
  display: grid;
  gap: 4px;
  grid-template: repeat(4, 175px)/repeat(2, 175px);
  margin-bottom: 20px;
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

const CategoryContainer=styled.div`
  display: flex;
  jutify-content: space-between;
  gap: 8px;
  margin-top: 10px;
  position: absolute;
  left: 20px;
  bottom: 10px;
`

const EditCotainer=styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 7px 32px;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  border-radius: 5px;
  border: 1px solid var(--material-theme-sys-light-outline, #787680);
`
const EditContent=styled.div`
  color: var(--material-theme-sys-light-outline, #787680);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
`
const CoordinatorIntro = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-bottom: 1.89vh;
`;

const PostContainer=styled.div`
  position: relative;
  width: 175px;
  height: 175px;
`
const PostImg=styled.img`
  width: 175px;
  height: 175px;
  border-radius: 18px;
  object-fit: cover;
`

const OuterMyPage = () => {
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate(-1); 
  }
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer>
              <img src={goback} onClick={handleGoBack} />
          </GobackContainer>
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={"웜톤 천재 아우터"}/>
          <Grades/>
          {/* 프로필 편집 버튼 */}
          <Link to="/editcoprofile">
            <EditCotainer>
              <EditContent>프로필 편집</EditContent>
            </EditCotainer>
          </Link>
          {/* 마이페이지 내용 */}
          <CoordinatorIntro>
          안녕하세요 저는 패션디자인과를 졸업한 아우터입니다. 주로 아이돌 코디를 전담했었습니다.
          </CoordinatorIntro>
          {/* 인기코디 */}
          <Category>인기 코디</Category>
          <PopularContainer>
            <PostList ref={containerRef}
              onMouseDown={handelMouseDownEvent}
              onMouseLeave={() => setDragging(false)}
              onMouseUp={() => setDragging(false)}
              onMouseMove={handelMouseMoveEvent}>
              <PostMainImg image={logo} name={'미니멀코디'} like={12340}/>
              <PostMainImg image={sample} name={'비지니스 캐주얼 코디'} like={12340}/>  
              <PostMainImg image={logo} name={'시티보이 코디'} like={12340}/> 
            </PostList>
          </PopularContainer>

          {/* 전체코디 */}
          <Category>전체 코디</Category>
          <EveryContainer>
            <PostContainer>
              <PostImg src={logo} />
              <CategoryContainer>
                <SmallStyleCategoryBox content={'#미니멀'}></SmallStyleCategoryBox>
                <SmallStyleCategoryBox content={'#시티보이'}></SmallStyleCategoryBox>
              </CategoryContainer> 
            </PostContainer>
            <PostContainer>
              <PostImg src={logo} />
              <CategoryContainer>
                <SmallStyleCategoryBox content={'#미니멀'}></SmallStyleCategoryBox>
                <SmallStyleCategoryBox content={'#미니멀'}></SmallStyleCategoryBox>
              </CategoryContainer>
            </PostContainer>
            <PostContainer>
              <PostImg src={logo} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
          </EveryContainer>

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default OuterMyPage;