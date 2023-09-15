import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import ReviewBox from "../../components/MainPage/ReviewBox";
import PostMainImg from "../../components/MainPage/PostMainImg";
import logo from "../../assets/img/logo.svg"
import fillMinHeart from "../../assets/img/fillMinHeart.svg";
import star from "../../assets/img/star.svg";
import money from "../../assets/img/money.svg";
import hanger from "../../assets/img/hanger.svg";
import goback from "../../assets/img/goback.svg";

const GobackContainer=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
`

const Grade = styled.div`
    display: flex;
    text-align: center;
    margin-top: 1.30vh;
    margin-bottom: 1.30vh;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.048px;
    white-space: nowrap;
`
const GradeIcon = styled.img`
    margin-right: 7px;
`;

const GradeBar = styled.div`
    width: 1px;
    height: 1.65vh;
    background: #C4C4C4;
    margin: 0px 7px;
`
const CoordinatorIntro = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-bottom: 1.89vh;
`;

const ReviewText = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
    margin-top: 4.26vh;
    margin-bottom: 1.77vh;
`
const PopularContainer = styled.div`
  border-top: 1px solid #C8C5D0;
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

const OuterProfile = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동 (-1은 이전 페이지를 가리킵니다)
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
          {/* like , start , money , hanger */}
          <Grade>
            <GradeIcon src={fillMinHeart}/>
            1234
            <GradeBar/>
            <GradeIcon src={star}/>
            4.95
            <GradeBar/>
            <GradeIcon src={money}/>
            50,000원 ~
            <GradeBar/>
            <GradeIcon src={hanger}/>
            123번
          </Grade>
          <CoordinatorIntro>
            웜톤천재 아우터가 추천하는 미니멀한 코디에요! 이번 코디는 SPA브랜드만을 이용해서 진행했어요! 나에게 딱 맞는 미니멀 코디가 필요하시다면 채팅 주세요🌰
          </CoordinatorIntro>
          <CoordinatorMainImg/>
          {/* Review */}
          <ReviewText>
            웜톤천재 아우터 님의 후기
          </ReviewText>
          <ReviewBox></ReviewBox>
          {/* Other Codi */}
          
          <PopularContainer>
          <ReviewText>웜톤천재 아우터 님의 다른 코디</ReviewText>
            <PostList>
              <PostMainImg image={logo} name={'미니멀코디'} like={12340}/>
            </PostList>
          </PopularContainer>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default OuterProfile;