import React from 'react';
import styled from 'styled-components';
import * as f from '../Common/CommonStyle';
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";
import hanger from '../../assets/img/hanger.svg';
import star from '../../assets/img/star.svg';
import rank1 from '../../assets/img/Rank/rank1.svg';

const CoordinatorInfos = styled.div`
    width: 61px;
    height: 61px;
    display: flex;
    margin-top: 2.36vh;
    margin-bottom: 1.06vh;
    color: #000;
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
    width: 100%;
    margin-left:14px;
`;

const CoordinatorGrade = styled.div`
    display: flex;
    justify-content: space-between;
`

const Rank = styled.img`
    margin-right: 4px;
`;

const CoordinatorName = styled.div`
    width: 300px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08px;
    margin-right: 8px;
`;

const Hanger = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
    margin-right: 8px;
`;

const HangerImg = styled.img`
    margin-right: 5px;
`;

const Star = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.18px;
`;


const StarImg = styled.img`
    margin-right: 7px;
`;

const CategoryBox = styled.div`
    display: flex;
    margin-top: 1.18vh;
`

const HangerContent=styled.div`
    color: black;
`

const CoordinatorInfo = (props) => {

    return(
        <CoordinatorInfos>
            <CoImgContainer>
                <CoordinatorImg src={props.profileImg}></CoordinatorImg>
            </CoImgContainer>
            <CoordinatorSubInfo>
                <CoordinatorGrade>
                    <f.Flex>
                        <Rank src={rank1}/>
                        <CoordinatorName>{props.name}</CoordinatorName>
                    </f.Flex>
                        <f.Flex>
                        <Hanger>
                            <HangerImg src={hanger}></HangerImg>
                            의뢰 {props.requestCnt}번
                        </Hanger>
                        <Star>
                            <StarImg src={star}></StarImg>
                            {props.likeCnt}
                        </Star>
                        </f.Flex>
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