import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import styled from 'styled-components';
import * as f from '../Common/CommonStyle';
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import rank1 from '../../assets/img/Rank/rank1.svg';
import instagram from '../../assets/img/instagram.svg';
const CoordinatorInfos = styled.div`
    display: flex;
    margin-top: 2.36vh;
    margin-bottom: 1.06vh;
    color: #000;
    cursor: pointer;
`;

const CoImgContainer=styled.div`
    width: 61px;
    height: 61px;
`
const CoordinatorImg = styled.img`
    width: 61px;
    height: 61px;
    border-radius: 50%;
    object-fit: cover; /* 이미지를 커버 모드로 설정 */
`;

const CoordinatorSubInfo = styled.div`
    margin-left:14px;
`;

const CoordinatorGrade = styled.div`
    display: flex;
    white-space: nowrap;
`

const Rank = styled.img`
    margin-right: 4px;
`;

const CoordinatorName = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08px;
    margin-right: 8px;
`;

const Instagram = styled.div`
    display: flex;
    padding: 4px 12px;
    color: #4F44E2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 5px;
    border: 1px solid #C4C0FF;
    margin-left: 12px;
`;

const InstagramImg = styled.img`
    margin-right: 8px;
`;

const CategoryBox = styled.div`
    display: flex;
    margin-top: 1.18vh;
    margin-bottom: 1vh;
`

const CoordinatorInfo = (props) => {
    return(
        <CoordinatorInfos>
            <CoImgContainer>
                <CoordinatorImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+props.profileImg}></CoordinatorImg>
            </CoImgContainer>
            <CoordinatorSubInfo>
                <CoordinatorGrade>
                    <Rank src={rank1}/>
                    <CoordinatorName>{props.name}</CoordinatorName>
                    {props.linkState? ( <Link to={'//'+props.snsLink} target='_blank'>
                        <Instagram>
                            <InstagramImg src={instagram}/>
                            Instagram
                        </Instagram>
                    </Link>): null}
                    </CoordinatorGrade>
                <CategoryBox>
                {props.styles?.map((style)=>(
                    <SmallStyleCategoryBox content={style}></SmallStyleCategoryBox>
                ))}
                </CategoryBox>
            </CoordinatorSubInfo>
        </CoordinatorInfos>
    )
}
export default CoordinatorInfo;