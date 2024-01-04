import React, { useState,useRef,useEffect } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import BottomSheet from "../../components/MainPage/BottomSheet";
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';
import axios from 'axios'; 


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
  border-bottom: 1px solid #C8C5D0;
`;
const UserMainPage = () => {
  const initialLikedPosts = {};
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
  const [mainPage, setMainPage] = useState(null);
  const [selectStyle, setSelectStyle] = useState(mainPage?.styles || []);
  const [filteredPosts, setFilteredPosts] = useState(mainPage?.pages || []);


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

  const openBottonSheet = () => {
    setIsOpen(true)
  }
  // 백엔드 통신
  useEffect(()=>{
    async function fetchMainPage(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.get("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/main/user");
        setMainPage(res.data);        
        console.log(res.data)
      }catch(error){
        console.error(error);
      }
    }
    fetchMainPage();
  }, [])

  // filter function
  const changeStyle = (style) => {
    if (!style) {
      // 스타일이 없는 경우, 모든 게시물을 보여줍니다.
      setFilteredPosts(mainPage?.pages || []);
    } else {
      // 선택한 스타일에 해당하는 게시물만 필터링합니다.
      const filtered = mainPage?.pages.filter((data) => data.styles.includes(style));
      setFilteredPosts(filtered);
    }
    setSelectStyle(style);
  }

  useEffect(() => {
  if (mainPage) {
    let choiceStyle = mainPage?.styles || [];
    const filtered = mainPage?.pages.filter((data) => data.styles.some(style => choiceStyle.includes(style)));
    console.log(filtered);
    setFilteredPosts(filtered);
  }
}, [mainPage]);
  //like function
  const [likeBoardId, setLikeBoardId] = useState([]);

  useEffect(() => {
    if(mainPage == null) return;
    if(mainPage?.styles){
      setSelectStyle(mainPage.styles);
    }
    setLikeBoardId(mainPage?.user_board_like);
  }, [mainPage])

  const likeIncrease = (board_id, fillColor) => {
    console.log(board_id)
    console.log(likeBoardId)
    console.log(fillColor); 
    async function fetchLike(){
      try{
          axios.defaults.withCredentials=true;
          const res = await axios.get("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/user/like?boardId="+board_id);
          if(res.data == 'success'){
            setLikeBoardId([...likeBoardId, board_id]);
          }

      }catch(error){
          console.error(error);
      }}
  
    async function fetchLikeCancel() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/user/unlike?boardId="+board_id);
        if(res.data == 'possible'){
          console.log('possible')
          setLikeBoardId((oldValue) => {
            return oldValue.filter((id) => id !== board_id)
          });        
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    if (fillColor == fillheart) {
      fetchLikeCancel();
    } else {
      fetchLike();
    }
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
            {mainPage?.styles.map(style => (
              <BigStyleCategoryBox content={'#'+style} onClick={() => changeStyle(style)}
              isSelected={selectStyle.includes(style)} />
            ))}
            
          </HashTag>
          {/* 코디네이터 프로필 */}
          {filteredPosts?.map((data)=>(
            <CoordinatorProfile>
              <Link to={`/postdetail/${data.board_id}`}>
                <CoordinatorMainImg boardImg={data.board_image}
                likeIncrease={(fillColor, e) => {
                  e.preventDefault(); // 링크 이동을 막음
                  likeIncrease(data.board_id, fillColor); // 하트 클릭 이벤트 처리
                }}
                fillColor={likeBoardId.includes(data.board_id) ? fillheart : heart}/>
              </Link>
            <Link to={`/outerprofile/${data.coordinator_id}`}>
              <CoordinatorInfo name={data.nickname} profileImg={data.profile_image}
              requestCnt={data.request_count} likeCnt={data.total_like} styles={data.styles} linkState={false}/>
            </Link>
          </CoordinatorProfile>
          ))}
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'Home'}/>
    </f.Totalframe>
  );
};

export default UserMainPage;