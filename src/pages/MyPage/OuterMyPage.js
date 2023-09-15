import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import PostMainImg from "../../components/MainPage/PostMainImg";
import BigStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import Grades from "../../components/MainPage/Grades";
// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";
import goback from "../../assets/img/goback.svg"

const GobackContainer=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
`

const Grade = styled.div`
    display: flex;
    justify-content:space-between;
    text-align: center;
    padding: 0 17px;
    margin-top: 1.30vh;
    margin-bottom: 1.30vh;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.048px;
    white-space: nowrap;
`
const GradeSection=styled.div`
    display: flex;
    align-items: center;
`
const GradeIcon = styled.img`
    margin-right: 7px;
`;

const GradeBar = styled.div`
    width: 1px;
    height: 1.65vh;
    background: #C4C4C4;
    margin: 0px 0px 0px 18px;
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
  disply: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--material-theme-sys-light-outline-variant, #C8C5D0);
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
const PostContainer=styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Date=styled.div`
  margin-bottom: 9px;
  color: #000;
  font-family: Noto Sans CJK KR;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
`
const ImgContainer=styled.div`
  margin-bottom: 10px;
  display: flex;
  height: 362px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
`
const MainImg=styled.img`
  object-fit: cover;
  jusfity-content: center;
  flex-shrink: 0;
  border-radius: 18px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const CategoryContainer=styled.div`
  display: flex;
  jutify-content: center;
  margin-top: 10px;
`

const ContentContainer=styled.div`
  margin-top: 20px;
  width: 343px;
  height: 65px;
`
const Content=styled.div`
  font-family: Noto Sans CJK KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.175px;
  whitespace: nowrap;
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
          <EditCotainer>
            <EditContent>프로필 편집</EditContent>
          </EditCotainer>
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
              {/* 날짜 */}
              <Date>2023.09.12 작성</Date>
              {/* 게시물 메인 사진 */}
              <ImgContainer>
                <MainImg src={logo}></MainImg>
              </ImgContainer>
              {/* 태그들 */}
              <CategoryContainer>
                <BigStyleCategoryBox content={'#미니멀'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#시티보이'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#스포티'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#봄 코디'}></BigStyleCategoryBox>
              </CategoryContainer>
              {/* 콘텐츠 */}
              <ContentContainer>
                <Content>
                피터 여러분! 활동량이 점점 늘어나는 5월이 다가오고 있네요 우리 봄에도 옷 예쁘게 입어야죠🌸 저는 오늘 파타
                </Content>
              </ContentContainer>
            </PostContainer>
          </EveryContainer>

          <EveryContainer>
            <PostContainer>
              {/* 날짜 */}
              <Date>2023.09.12 작성</Date>
              {/* 게시물 메인 사진 */}
              <ImgContainer>
                <MainImg src={sample}></MainImg>
              </ImgContainer>
              {/* 태그들 */}
              <CategoryContainer>
                <BigStyleCategoryBox content={'#미니멀'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#시티보이'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#스포티'}></BigStyleCategoryBox>
                <BigStyleCategoryBox content={'#봄 코디'}></BigStyleCategoryBox>
              </CategoryContainer>
              {/* 콘텐츠 */}
              <ContentContainer>
                <Content>
                피터 여러분! 활동량이 점점 늘어나는 5월이 다가오고 있네요 우리 봄에도 옷 예쁘게 입어야죠🌸 저는 오늘 파타고니아, 나이키만을 이용해서 봄 옷 코디 해봤어요! 파타고니아 미니멀 감성이 전 좋더라고요~ 
                여러분에게 딱 맞는 스포티한 코디가 필요하시다면, 저 스포티 아우터에게 채팅 주세요!
                </Content>
              </ContentContainer>
            </PostContainer>
          </EveryContainer>


        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default OuterMyPage;