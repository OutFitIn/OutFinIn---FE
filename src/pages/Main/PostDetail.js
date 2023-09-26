import React, { useState, useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BottomPrice from "../../components/MainPage/BottomPrice";
import GobackContainer from "../../components/Common/GobackContainer";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import Navigation from "../../components/Navigation/Navigation";
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';
import Grades from '../../components/MainPage/Grades';

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

const CoordinatorTitle = styled.div`
  padding-top: 11px;
  margin-bottom: 11px;
  width: 354px;
  color: var(--material-theme-black, #000);
  font-family: Noto Sans CJK KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.024px;
`

const PostDetail = (props) => {
  const [modal, setModal] = useState(false);
  const initialLikedPosts = {};
  const [post, setPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
  const [like, setLike] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const styleTag = [];

  const location = useLocation();
  let { board_id } = useParams();

  useEffect(() => {
    async function fetchPostDetail() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/board/show?id="+board_id);
        setPost(res.data);
        setLikeStatus(res.data.like_status);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostDetail();

  //   if (location.state && location.state.from === "/writenewpost") {
  //     const modalTimer = setTimeout(() => {
  //       setModal(true);
  //     }, 1000);

  //     // 컴포넌트가 언마운트될 때 타이머를 클리어
  //     return () => clearTimeout(modalTimer);
  //   }
  // }, [board_id, location.state]);


  // // 모달을 렌더링 후 3초 후에 모달 숨김
  // useEffect(() => {
  //   const modalHideTimer = setTimeout(() => {
  //     setModal(false);
  //   }, 3000);

  //   // 컴포넌트가 언마운트될 때 타이머를 클리어
  //   return () => clearTimeout(modalHideTimer);
  }, []);


  useEffect(() => {
    async function fetchNickname() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/nickname");
        setUserNickname(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNickname();
  }, [])

  styleTag.push(post.style);
  styleTag.push(post.season);
  styleTag.push(post.situation);
  const [likeStatus, setLikeStatus] = useState(false);

  //like function
  const likeIncrease = (board_id, fillColor) => {
    async function fetchLike(){
      try{
          axios.defaults.withCredentials=true;
          const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/like?boardId="+board_id);
          if(res.data === 'success') {
            setLikeStatus(true);
          }
      }catch(error){
          console.error(error);
      }}
  
    async function fetchLikeCancel() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/unlike?boardId="+board_id);
        if(res.data == 'possible'){
          console.log('possible')
          setLikeStatus(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (likeStatus) {
      fetchLikeCancel();
    } else {
      fetchLike();
    }
  }

  // // 게시물의 좋아요 상태를 토글하는 함수
  // const toggleLike = (postId) => {
  //   setLikedPosts((prevLikedPosts) => ({
  //     ...prevLikedPosts,
  //     [postId]: !prevLikedPosts[postId], // 현재 상태를 반전시킴
  //   }));
  // };

  // 채팅룸 만들기 - 준형
  const navigate = useNavigate();

  const createChatRoom = () => {
    async function fetchChatRoom() {
      try {
        axios.defaults.withCredentials = true;
        // 상대 코디네이터 닉네임 보내기
        // 반환 값은 만들어진 채팅방 ID -> 이걸로 ChatRoom에서 Params 사용해서 불러오자
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/chat/room?coordinatorNickname=" + post.nickname);
        navigate(`/userchatroom/${res.data}/${userNickname}/${post.nickname}`); // 만들어진 채팅방으로 이동
      } catch (error) {
        console.error(error);
      }
    }

    fetchChatRoom();
  }

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          {/* {modal && (
            <TopModal show={modal} content={"성공적으로 글을 작성하였습니다."} />
          )} */}
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo
            name={post.nickname}
            profileImg={post.profile_image}
            styles={styleTag} 
            snsLink={post.sns_url} 
            linkState={post.sns_url !== ''} />
          <Grades likeCnt={post.like_count} requestCnt={post.request_count} />
          {/* 글 제목 */}
          <CoordinatorTitle>
            {post.title}
          </CoordinatorTitle>
          {/* 글 설명 */}
          <CoordinatorIntro>
            {post.content}
          </CoordinatorIntro>
          <CoordinatorMainImg boardImg={post.board_image}
            likeIncrease={(fillColor, e) => {
              e.preventDefault(); // 링크 이동을 막음
              likeIncrease(board_id, fillColor); // 하트 클릭 이벤트 처리
            }}
            fillColor={likeStatus ? fillheart : heart} />
          {/* Other Codi */}
          {/* <ReviewText>
            {post.nickname} 님의 다른 코디
          </ReviewText> */}
        </f.ScreenComponent>
      </f.SubScreen>
      {localStorage.getItem('mode') == 1 ? <Navigation type={null} /> : <BottomPrice createChatRoom={createChatRoom} />}
    </f.Totalframe>
  )
}

export default PostDetail;