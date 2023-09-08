import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import QuestionMode from '../../components/Join/QuestionModeBox';
import {AiOutlineCheckCircle} from 'react-icons/ai';

const Email = styled.input`
    border-radius: 5px;
    border: 1px solid #100069;
    width: 151px;
    height: 35px;
    padding-left: 12px;
    &:focus{
        outline:none;
    }
`;

const Dot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #C8C5D0;
    font-size: 14px;
    font-weight: 400;
    margin: 0px 5px;
    letter-spacing: 0.175px;
`;

const Domain = styled.select`
    border-radius: 5px;
    border: 1px solid #100069;
    width: 171px;
    height: 35px;
    padding: 7px 16px 8px 12px;
    &:focus{
        outline:none;
    }
`;

const AuthenticateCode = styled.div`
    display:flex;
    justify-content: space-between;
    width:100%;
    margin-top:15px;
    display: inline-flex;
    padding: 5px 0px 5px 10px;
    align-items: center;
    border-bottom: 1px solid #100069;
`;

const AuthenticateInput = styled.input`
    border:none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.175px;
    &:focus{
        outline:none;
    }
`;

const Time = styled.div`
    color: #787680;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.175px;
    margin-right:10px;
`;

const AuthenticateText = styled.div`
    text-align: center;
    cursor: pointer;
    color: #C8C5D0;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.15px;
    margin-top: 2.84vh
`;

const InputEmail = () => {

    return(
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <QuestionMode content={'서비스 이용 시작 전\n본인인증이 필요합니다.'} marginBottom={'6.27vh'}/>
                        <f.Flex>
                            <Email placeholder="이메일 주소"></Email>
                            <Dot>@</Dot>
                            <Domain placeholder="gmail.com">
                                <option value="gmail.com">gmail.com</option>
                                <option value="yahoo.com">naver.com</option>
                                <option value="outlook.com">daum.net</option>
                                <option value="outlook.com">hanmail.net</option>
                                <option value="outlook.com">nate.com</option>
                                <option value="outlook.com">icloud.com</option>
                            </Domain>
                        </f.Flex>
                        <AuthenticateCode>
                            <AuthenticateInput placeholder="인증 코드를 입력해주세요"></AuthenticateInput>
                            <div style={{display:'flex'}}>
                                <Time>10:00</Time>
                                <AiOutlineCheckCircle fill="#C9C5CA"/>
                            </div>
                        </AuthenticateCode>
                        <AuthenticateText>인증 코드를 못 받았아요</AuthenticateText>
                        <Link to="../joinsuccess" style={{ textDecoration: 'none' }}>
                            <ButtonBottom content={'메일 받기'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default InputEmail;