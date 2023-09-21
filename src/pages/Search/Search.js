import React, { useState, useRef, useEffect } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import GobackContainer from "../../components/Common/GobackContainer";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorInfo2 from "../../components/MainPage/CoordinatorInfo2";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import CoordinatorMainImg2 from "../../components/MainPage/CoordinatorMainImg2";
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

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [search, setSearch] = useState(null);
  const [firstPage, setFirstPage] = useState(null);
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

  useEffect(()=>{
    async function fetchSearchPage(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.get("http://localhost:8080/search/main");
        setFirstPage(res.data);
      }catch(error){
        console.error(error);
      }
    }
    fetchSearchPage();
  }, [])

  

  // after filter
  const [styleCategories, setStyleCategories] = useState([
    "미니멀",
    "이지캐주얼",
    "비즈니스캐주얼",
    "아메카지",
    "스트릿",
    "시티보이",
    "원마일웨어",
    "스포티",
    "유니크",
    "레트로",
    "올드머니룩",
    "하객룩",
    "바캉스룩",
    "힙합",
  ]);

  const [weatherCategories, setWeatherCategories] = useState([
    ["봄 코디", "여름 코디"],
    ["가을 코디", "겨울 코디"],
  ]);

  const [situationCategories, setSituationCategories] = useState([
    "면접", "여행", "캠퍼스", "데이트", "출근", "결혼식"
  ]);

  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [selectedSituation, setSelectedSituation] = useState([]);

  useEffect(() => {
    console.log("style " + selectedStyles);
    console.log("weather " + selectedWeather);
    console.log("situation " + selectedSituation);
  
  }, [selectedStyles, selectedWeather, selectedSituation])

    // filter axios start
    const searchHandler = () => {
      async function fetchCodiCheck(){
        try{
          axios.defaults.withCredentials=true;
          const res = await axios.post("http://localhost:8080/search/styleSearch",
          {
            styles : selectedStyles,
            season : selectedWeather,
            situation : selectedSituation
          });
          setIsOpen(!isOpen);

          setSearch(res.data);
          setSelectedStyles([]);
          setSelectedWeather([]);
          setSelectedSituation([]);
          setFirstPage(null);
        }catch(error){
          console.error(error.config.data);
        }
      }
      fetchCodiCheck();
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
            <MainText>이런 스타일은 어떠신가요? 👀</MainText>
            {firstPage?.map((data) => (
              <>
              <Link to='/postdetail'>
              <CoordinatorMainImg boardImg={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data.board_image}/>
              </Link>
              <Link to='/outerprofile'>
                <CoordinatorInfo name={data.nickname} profileImg={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data.profile_image} requestCnt={data.request_count}
                likeCnt={data.total_like} styles={data.styles}/>
              </Link>
              </>              
            ))}

            

            {/* 코디네이터 프로필 */}
            {search?.map((data)=>(
              <>
              <Link to='/postdetail'>
              <CoordinatorMainImg2 boardImg={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data.boardImage}/>
              </Link>
              <Link to='/outerprofile'>
                <CoordinatorInfo2 name={data.coornickname} profileImg={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data.coorimageUrl} requestCnt={data.coorrequestCount}
                likeCnt={data.boardlikeCount} styles={data.boardStyle} weather={data.boardseason} situation={data.boardsituation}/>
              </Link>
              </>
            ))}

            
          </f.ScreenComponent>
        </f.SubScreen>
        {isOpen ? <BottomSheet openState={isOpen} isOpen={isOpen} sendData={searchHandler} 
        styleCategories={styleCategories} weatherCategories={weatherCategories} situationCategories={situationCategories}
        selectedStyles={selectedStyles} selectedSituation={selectedSituation} selectedWeather={selectedWeather}
        setSelectedStyles={setSelectedStyles} setSelectedSituation={setSelectedSituation} setSelectedWeather={setSelectedWeather}/> 
        : <Navigation type={'search'}/> }
      </f.Totalframe>
    );
  };

  export default Search;
