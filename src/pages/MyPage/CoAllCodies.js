import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import styled from "styled-components";
import axios from 'axios';
import Navigation from "../../components/Navigation/Navigation";

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";

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

const EveryContainer=styled.div`
  display: grid;
  gap: 4px;
  grid-template: repeat(4, 175px)/repeat(2, 175px);
  margin-bottom: 20px;
`

const CategoryContainer=styled.div`
  display: flex;
  jutify-content: space-between;
  gap: 8px;
  margin-top: 10px;
  position: absolute;
  left: 20px;
  bottom: 10px;
`
const PostContainer=styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  cursor: pointer;
`

const PostImg=styled.img`
  width: 175px;
  height: 175px;
  border-radius: 18px;
  object-fit: cover;
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

const PostInfo=styled.div`
  position: absolute;
  left: 16px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const CoAllCodies = () => {
  const [allCodies,setAllCodies] = useState([]);
  // 백엔드 통신 (이 페이지 렌더링 되자마자 모든 게시물 보여주게끔 useEffect에)
  useEffect(()=>{
    async function fetchshowCodies(){
      try{
        axios.defaults.withCredentials=true;
        const res = await axios.get("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/coordinator/board/all"); 
        setAllCodies(res.data)
      }catch(error){
        console.error(error);
      }
    }
    fetchshowCodies();
  }, [])

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          {/* 전체코디 */}
          <Category>전체 코디</Category>
          <EveryContainer>
            {allCodies?.map((data)=>(
              <Link to={`/postdetail/${data.board_id}`}>
                <PostContainer>
                  <PostImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data.image_url} />
                  <PostInfo>
                    <Postname>{data.title}</Postname>
                  </PostInfo>
                </PostContainer>
              </Link>
            ))}
          </EveryContainer>

          
          {/* 여기 없애기!
          <EveryContainer>
            <PostContainer>
              <PostImg src={logo} />
              <CategoryContainer>
              </CategoryContainer> 
            </PostContainer>
            <PostContainer>
              <PostImg src={logo} />
              <CategoryContainer>
              </CategoryContainer>
            </PostContainer>
            <PostContainer>
              <PostImg src={logo} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
            <PostContainer>
              <PostImg src={sample} />
            </PostContainer>
          </EveryContainer> */}

        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'mypage'}/>
    </f.Totalframe>
    )
}
export default CoAllCodies;