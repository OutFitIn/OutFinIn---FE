import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";
import GobackContainer from "../../components/Common/GobackContainer";
import Grades from "../../components/MainPage/Grades";
import ReviewBox from "../../components/MainPage/ReviewBox";
import PostMainImg from "../../components/MainPage/PostMainImg";
import logo from "../../assets/img/logo.svg";
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';

import sample from "../../assets/img/sample.svg";

const Grade = styled.div`
  display: flex;
  text-align: center;
  margin-top: 1.3vh;
  margin-bottom: 1.3vh;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.048px;
  white-space: nowrap;
`;
const GradeIcon = styled.img`
  margin-right: 7px;
`;

const GradeBar = styled.div`
  width: 1px;
  height: 1.65vh;
  background: #c4c4c4;
  margin: 0px 7px;
`;
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
`;
const PopularContainer = styled.div``;
const PostList = styled.div`
  display: flex;
  gap: 16px;
  cursor: pointer;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OuterProfile = () => {
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [page, setPage] = useState([]);
  const [like, setLike] = useState(false);
  const [likeBoardId, setLikeBoardId] = useState([]);
  const containerRef = useRef(null);

  const { coordinator_id } = useParams();

  useEffect(() => {
    if (coordinator_id) {
      console.log(coordinator_id);
      async function fetchData() {
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(
            "https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/coordinator/page?id=" + coordinator_id
          );
          setPage(res.data);
          setLikeBoardId(res.data.user_board_id);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [coordinator_id]);

  const handelMouseDownEvent = (e) => {
    setDragging(true);
    if (containerRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handelMouseMoveEvent = (e) => {
    if (!dragging) return;

    e.preventDefault();

    if (containerRef.current) {
      const walk = e.pageX - clickPoint;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

   //like function
  const likeIncrease = (board_id, fillColor) => {
    async function fetchLike() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/like?boardId=" + board_id);
        if(res.data === 'success'){
          setLikeBoardId([...likeBoardId, board_id]);
        }

      } catch (error) {
        console.error(error);
      }
    }

    async function fetchLikeCancel() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/user/unlike?boardId=" + board_id);
        if(res.data === 'possible'){
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
          <GobackContainer />
          {/* 코디네이터 프로필 */}
          <CoordinatorInfo name={page.nickname} styles={page.styles} profileImg={page.profile_image} linkState={true} snsLink={page.sns_url}/>
          <Grades likeCnt={page.total_like} requestCnt={page.request_count}/>
          <CoordinatorIntro>{page.content}</CoordinatorIntro>
          {/* 게시물 목록 */}
          <PopularContainer>
            <PostList
              ref={containerRef}
              onMouseDown={handelMouseDownEvent}
              onMouseLeave={() => setDragging(false)}
              onMouseUp={() => setDragging(false)}
              onMouseMove={handelMouseMoveEvent}
            >
              {page.boards?.map((board) => (
                <Link to={`/postdetail/${board.board_id}`}>
                  <PostMainImg 
                  image={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+board.image_url}
                  name={board.title}
                  likeIncrease={(fillColor, e) => {
                    e.preventDefault(); // 링크 이동을 막음
                    likeIncrease(board.board_id, fillColor); // 하트 클릭 이벤트 처리
                  }}
                  fillColor={likeBoardId?.includes(board.board_id) ? fillheart : heart}/>
                </Link>
              ))}
            </PostList>
          </PopularContainer>
          {/* Review */}
          <ReviewText>{page.nickname}님의 후기</ReviewText>
          <ReviewBox></ReviewBox>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={"Home"} />
    </f.Totalframe>
  );
};
export default OuterProfile;
