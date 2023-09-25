import React, { useState,useRef, useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import axios from 'axios';
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import plus from '../../assets/img/plus.svg';
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
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
  position: relative;
`;

const Rank=styled.div`
  position: absolute;
  top: 0px;
  left: -7px;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: ${(props)=> props.top? 'white' : '#4F44E2'};
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  border-radius: 22px;
  border: 1px solid ${(props)=> props.top? '#4F44E2':'#E3DFFF'};
  filter: ${(props)=> props.top? null:'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'};
  background: ${(props)=> props.top? 'linear-gradient(148deg, #4F44E2 14.45%, #C4C0FF 82.33%)' : 'linear-gradient(148deg, #A39DFF 14.45%, #E0DEFF 82.33%)'};
`

const WriteButtonContainer=styled.div`
  position: absolute;
  right: 10px;
  bottom: 17vh;
`
const Line=styled.div`
    width: 100%;
    height: 0.7px;
    background: #F1EDF1;
`

const OuterMainPage = () => {
    const [selectStyle, setSelectStyle] = useState('');
    const [dragging, setDragging] = useState(false);
    const [clickPoint, setClickPoint] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [outerMyPage,setOuterMyPage] = useState(''); //사용자 정보 가져오기
    const [filteredStyle, setFilteredStyle]=useState([]);
    const containerRef = useRef(null);

    const [mainPage, setMainPage] = useState(null);
  
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

    // 백엔드 통신-코디네이터들 정보 가져오기
    useEffect(()=>{
      async function fetchMainPage(){
        try{
          axios.defaults.withCredentials=true;
          const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/main/coordinator");
          setMainPage(res.data)
        }catch(error){
          console.error(error);
        }
      }
      fetchMainPage();
    }, [])

      // 백엔드 통신-사용자 스타일 가져오기
      useEffect(()=>{
        async function fetchMainPage(){
          try{
            axios.defaults.withCredentials=true;
            const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/coordinator/mypage");
            setOuterMyPage(res.data)
            setFilteredStyle(res.data.styles);
            console.log(filteredStyle);
          }catch(error){
            console.error(error);
          }
        }
        fetchMainPage();
      }, [])

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
            {/* header */}
            <MainText>인기 아우터들의<br/>코디를 둘러보세요 👀</MainText>
            {/* <HashTag ref={containerRef}
                onMouseDown={handelMouseDownEvent}
                onMouseLeave={() => setDragging(false)}
                onMouseUp={() => setDragging(false)}
                onMouseMove={handelMouseMoveEvent}>
                {outerMyPage?.styles?.map((style)=>(
                  <BigStyleCategoryBox content={'#'+style} onClick={() => changeStyle(style)} isSelected={filteredStyle.includes(style)} />
                ))}
                <BigStyleCategoryBox content={'+'}/>
          </HashTag> */}
          {/* 코디네이터 프로필 */}
          {mainPage?.map((data, index)=>(
            <>
              <CoordinatorProfile>
                <Link to={`/outerprofile/${data.coordinator_id}`}>
                  <CoordinatorInfo name={data.nickname} profileImg={data.profile_image} likeCnt={data.total_like} requestCnt={data.request_count} styles={data.styles}/>
                </Link>
                <Rank top={index===0||index===1||index===2}>{index+1}</Rank>
              </CoordinatorProfile>
              <Line />
            </>
          ))}
          {/* 글 작성 버튼 */}
          <WriteButtonContainer>
            <Link to='/writenewpost'>
                <img src={plus} />
            </Link>
          </WriteButtonContainer>

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'Home'}/>
    </f.Totalframe>
    )
}
export default OuterMainPage;