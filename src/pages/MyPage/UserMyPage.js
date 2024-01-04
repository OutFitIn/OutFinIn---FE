import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import {Link, useAsyncError, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox"
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import Grades from "../../components/MainPage/Grades";
import Heart from "../../assets/img/mypage/heart.svg";
import Hanger from "../../assets/img/mypage/hanger.svg";
import Review from "../../assets/img/mypage/review.svg";
import Outer from "../../assets/img/mypage/outer.svg";
import naver from "../../assets/img/naver.svg"
import kakao from "../../assets/img/kakao.svg"
import google from "../../assets/img/google.svg"
// 소셜로그인
import {KAKAO_REGISTER_URL} from "../../LinkAuth/register/kakaoRegisterAuth.js";
import {GOOGLE_REGISTER_URL} from "../../LinkAuth/register/googleRegisterAuth.js";
import {NAVER_REGISTER_URL} from "../../LinkAuth/register/naverRegisterAuth.js";

//주석
const UserInfos = styled.div`
  margin-top: 2.72vh;
`;
const UserName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.08px;
  margin-right: 15px;
`;
const UserInfo = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.06px;
`;
const UserCategory = styled.div`
  margin-top: 1.18vh;
`;
const EditProfile = styled.div`
  width: 100%;
  height: 4.02vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #787680;
  margin-top: 1.42vh;
  color: #787680;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
  cursor: pointer;
`;
const MyPageMenu = styled.div`
  border-top: ${(props) => (props.mycodi)? '1px solid #C8C5D0' : '0px'};
  border-bottom: 1px solid #C8C5D0;
  display: flex;
  height: 5.71vh;
  margin-top: ${(props) => (props.mycodi)? '2.13vh' : '0px'};
  margin-bottom: ${(props)=>props.outer ? '17px' : '0px' };
  color: #000;
`;
const Icon = styled.img`
  margin: 8px 12px 8px 8px;
`;
const MyPageDescribe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.056px;
  cursor: pointer;
`;
const AccountBtns = styled.div`
  width: 355px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 120px;
`;
const AccountBox = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #C8C5D0;
  margin-right: ${(props)=>props.logout ? '7.5px' : '0px' };
  margin-left: ${(props)=>props.delete ? '7.5px' : '0px' };
  color: ${(props)=>props.delete ? '#690005': 'black'};
  cursor: pointer;
`;

// 소셜로그인
const SocialInfoContainer=styled.div`
    margin-top: 23px;
    display: flex;
    flex-direction: column;
    color: var(--material-theme-ref-neutral-neutral-80, #C9C5CA);
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
    text-align: center;
`
const SocialLogo=styled.div`
    margin-top: 9px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: 7px;
`

const LogoImg=styled.div`
    margin-right:2px;
    width: 40px;
    cursor: pointer;
`

const UserMyPage = () => {
  const [userMyPage,setUserMyPage] = useState('');
  const [bodyShape,setBodyShape] = useState('');
  const navigate = useNavigate();
  
  // 백엔드 통신
  useEffect(()=>{
    async function fetchMainPage(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.get("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/user/mypage?id="+1);
        res.data.shape == 'NATURAL' ? setBodyShape('내추럴') : res.data.shape == 'WAVE' ? setBodyShape('웨이브') : setBodyShape('스트레이트');
        setUserMyPage(res.data)
      }catch(error){
        console.error(error);
      }
    }
    fetchMainPage();
  }, [])

  //logout
  const clickLogOut = () =>{
    async function fetchLogOut(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.post("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/logout");
        navigate('/');
      }catch(error){
        console.error(error);
        navigate('/');
      }
    }
    fetchLogOut();
  }

    return(
        <f.Totalframe>
        <f.SubScreen>
          <f.ScreenComponent>
            <GobackContainer />
            {/* 코디네이터 프로필 */}
            <UserInfos>
              <f.Flex>
                <UserName>{userMyPage.nickname}</UserName>
                <UserInfo>{userMyPage.height}cm / {userMyPage.weight}kg / {bodyShape}</UserInfo>
              </f.Flex>
              <UserCategory>
                {userMyPage.styles?.map((data)=>(
                  <BigStyleCategoryBox content={'#'+data}/>
                ))}
              </UserCategory>
              <Link to={'/edituserprofile'}>
                <EditProfile>프로필 편집</EditProfile>
              </Link>
              <MyPageMenu mycodi>
                <Icon src={Hanger}/>
                <MyPageDescribe>내가 받은 코디</MyPageDescribe>
              </MyPageMenu>
              <Link to={'/likecodies'}>
                <MyPageMenu>
                  <Icon src={Heart}/>
                  <MyPageDescribe>좋아요 누른 코디</MyPageDescribe>
                </MyPageMenu>
              </Link>
              <MyPageMenu>
                <Icon src={Review}/>
                <MyPageDescribe>내가 쓴 리뷰 보기</MyPageDescribe>
              </MyPageMenu>
              <Link to={'/outerrankinfo'}>
                <MyPageMenu outer>
                  <Icon src={Outer}/>
                  <MyPageDescribe>아우터 랭킹별 정찰제</MyPageDescribe>
                </MyPageMenu>
              </Link>
            </UserInfos>
            {/* 소셜미디어 연동 */}
            <SocialInfoContainer>
              <div>소셜 로그인 연동하기</div>
                <SocialLogo>
                    <LogoImg><a href={KAKAO_REGISTER_URL}><img src={kakao} /></a></LogoImg>
                    <LogoImg><a href={NAVER_REGISTER_URL}><img src={naver} /></a></LogoImg>
                    <LogoImg><a href={GOOGLE_REGISTER_URL}><img src={google} /></a></LogoImg>
                </SocialLogo>
            </SocialInfoContainer>
            {/* 로그아웃, 계정삭제 버튼 */}
            <AccountBtns>
              <AccountBox logout onClick={clickLogOut}>로그아웃</AccountBox>
              <AccountBox delete>계정삭제</AccountBox>
            </AccountBtns>
          </f.ScreenComponent>
        </f.SubScreen>
        <Navigation type={'mypage'}/>
      </f.Totalframe>
    )
}
export default UserMyPage;