import React, {useState} from "react";
import {Link} from 'react-router-dom';
import * as f from "../../components/Common/CommonStyle";
import GobackContainer from "../../components/Common/GobackContainer";
import PostMainImg from "../../components/MainPage/PostMainImg";
import styled from "styled-components";
import logo from '../../assets/img/logo.svg';
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';

const Liketxt = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.064px;
    margin-top:19px;
`;

const TotalPost = styled.div`
    display: flex;
    // flex-wrap: wrap;
`;
const PostImg = styled.div`
    position: relative;
    margin-top: 8px;
    margin-right: 12px;
`;

const MainImg = styled.img`
    border-radius: 18px;
    width: 172px;
    height: 201px;
    object-fit: cover;
`;

const Heart = styled.img`
    position: absolute;
    top: 13.82px;
    right: 13.76px;
`
const LikeCodies = () => {
    const [fillColor, setFillColor] = useState(heart);
    const ChangeColor = () => {
        setFillColor(fillColor === heart ? fillheart : heart)
    }


    const postItems = [
        { id: 1, imgSrc: logo },
        { id: 2, imgSrc: logo },
        { id: 3, imgSrc: logo },
        { id: 4, imgSrc: logo },
        // 추가 포스트 데이터...
    ];
    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer />
          <Liketxt>좋아요 누른 코디</Liketxt>
            <TotalPost>
            {postItems.map((post, index) => (
                <PostImg key={post.id}>
                    <MainImg src={post.imgSrc} />
                    <Heart src={fillColor} onClick={ChangeColor}></Heart>
                </PostImg>
            ))}
            </TotalPost>
        </f.ScreenComponent>
      </f.SubScreen>
    </f.Totalframe>
    )
}
export default LikeCodies;