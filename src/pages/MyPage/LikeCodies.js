import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import styled from "styled-components";
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';

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

const TotalPost = styled.div`
  display: grid;
  gap: 4px;
  grid-template: repeat(4, 175px)/repeat(2, 175px);
  margin-bottom: 20px;
`;
const PostImg = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  cursor: pointer;
`;

const MainImg = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 18px;
  object-fit: cover;
`;

const PostInfo=styled.div`
  position: absolute;
  left: 16px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const Postname = styled.div`
  width: 150px;
  color: #FFF;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.175px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Heart = styled.img`
    position: absolute;
    top: 13.82px;
    right: 13.76px;
    cursor: pointer;
`
const LikeCodies = () => {
    const [fillColor, setFillColor] = useState(fillheart);
    const [boardLike, setBoardLike] = useState([]);


    // axios
    useEffect(() => {
        async function fetchData() {
            try {
              axios.defaults.withCredentials = true;
              const res = await axios.get(
                "https://ofi-ofi.koyeb.app/user/board/like"
              );
              setBoardLike(res.data);
              console.log(res.data)
            } catch (error) {
              console.error(error);
            }
          }
    
          fetchData();
      }, []);
    
      const likeIncrease = (board_id) => {
        console.log(board_id)
        // e.preventDefault(); // 링크 이동을 막음
        setFillColor(fillColor === heart ? fillheart : heart);
        async function fetchLike(){
          try{
              axios.defaults.withCredentials=true;
              const res = await axios.get("https://ofi-ofi.koyeb.app/user/like?boardId="+board_id);
          }catch(error){
              console.error(error);
          }}
      
        async function fetchLikeCancel() {
          try {
            axios.defaults.withCredentials = true;
            const res = await axios.get("https://ofi-ofi.koyeb.app/user/unlike?boardId="+board_id);
          } catch (error) {
            console.error(error);
          }
        }
      
        if (fillColor == fillheart) {
          fetchLikeCancel();
          boardLike.user_board_like.pop(board_id);
        } else {
          fetchLike();
          boardLike.user_board_like.push(board_id);
        }
    }
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer like/>
          <Category>좋아요 누른 코디</Category>
          <TotalPost>
            {boardLike?.boards?.map((post) => (
                <Link to={`/postdetail/${post.board_id}`}>
                <PostImg key={post.board_id}>
                    <MainImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+post.image_url} />
                    <PostInfo>
                      <Postname>{post.title}</Postname>
                    </PostInfo>
                <Heart src={boardLike.user_board_like.includes(post.board_id) ? fillheart : heart}
                onClick={(e)=>likeIncrease(post.board_id,e)}
                />
              </PostImg>
            </Link>
          ))}
          </TotalPost>
        </f.ScreenComponent>
      </f.SubScreen>
    </f.Totalframe>
    )
}
export default LikeCodies;