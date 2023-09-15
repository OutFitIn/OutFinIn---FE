import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import ReviewBox from "../../components/MainPage/ReviewBox";
import Grades from '../../components/MainPage/Grades';
import goback from '../../assets/img/goback.svg'

const GobackContainer=styled.div`
  margin-top:36px;
  margin-bottom: 8px;
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
const PostDetail = () => {
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
          <Grades/>
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
          <ReviewText>
            웜톤천재 아우터 님의 다른 코디
          </ReviewText>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default PostDetail;