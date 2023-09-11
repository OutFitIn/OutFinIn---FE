import React, {useState} from 'react';
import * as f from '../Common/CommonStyle';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import start from '../../assets/img/star.svg';

const Review = styled.div`
    height: 164px;
    padding: 15px;
    flex-direction: column;
    border-radius: 15px;
    border: 1px solid #ADAAAF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
      }
`;

const UserProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 45px;
    margin-right: 16px;
`
const UserNickName = styled.div`
    letter-spacing: 0.014px;
`;

const UserStar = styled.div`
    color: #4F44E2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
    margin-left: 5px;
`
const ReviewText = styled.div`
    letter-spacing: 0.056px;
    margin-top: 1.65vh;
`;
const ReviewBox = (props) => {
    return(
        <Review>
            <f.Flex>
                <UserProfile src={logo}/>
                <div>
                    <UserNickName>어쩔절쩔코디</UserNickName>
                    <f.Flex>
                        <img src={start}/>
                        <UserStar>평점 4.9</UserStar>
                    </f.Flex>
                </div>
            </f.Flex>
            <ReviewText>
                웜톤천재 아우터님에게 처음 의뢰했는데 1000000% 만족합니다...
                왜 제가 이 앱을 지금 알았을까요...? ㄹㅇ 웜톤 저격하는 코디 1타입니다...
                여러분도 빨리 웜톤천재 아우터님께 코디 받으세요!!!
            </ReviewText>
        </Review>
    )
}
export default ReviewBox;