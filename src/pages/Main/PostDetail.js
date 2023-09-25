import React, { useState,useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {useParams} from 'react-router-dom'
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

const CoordinatorTitle=styled.div`
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
  const initialLikedPosts = {};
  const [post,setPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
  const [like,setLike] = useState(false);
  const styleTag = [];

  let {board_id} = useParams();
  useEffect(() => {
    async function fetchPostDetail() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          "https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/board/show?id="+board_id
        );
        setPost(res.data);
        setLike(res.data.like_status);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostDetail();
  }, []);

  styleTag.push(post.style);
  styleTag.push(post.season);
  styleTag.push(post.situation);

  //like function
  const likeIncrease = (board_id, fillColor) => {
    async function fetchLike(){
      try{
          axios.defaults.withCredentials=true;
          const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/like?boardId="+board_id);
          setLike(true);

      }catch(error){
          console.error(error);
      }}
  
    async function fetchLikeCancel() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/unlike?boardId="+board_id);
        if(res.data == 'possible'){
          console.log('possible')
          setLike(false);      
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
  
  // 게시물의 좋아요 상태를 토글하는 함수
  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId], // 현재 상태를 반전시킴
    }));
  };
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={post.nickname} profileImg={post.profile_image} styles={styleTag} snsLink={post.sns_url} linkState={post.sns_url!==''}/>
          <Grades likeCnt={post.like_count} requestCnt={post.request_count}/>
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
          fillColor={ like ? fillheart : heart}/>
          {/* Other Codi */}
          {/* <ReviewText>
            {post.nickname} 님의 다른 코디
          </ReviewText> */}
        </f.ScreenComponent>
      </f.SubScreen>
      {localStorage.getItem('mode') == 1 ? <Navigation type={null}/> : <BottomPrice/>}
    </f.Totalframe>
    )
}
export default PostDetail;