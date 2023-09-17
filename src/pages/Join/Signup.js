import React,{ useRef,useState} from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import QuestionMode from '../../components/Join/QuestionModeBox';
import eyeUnfilled from '../../assets/img/eyeUnfilled.svg';
import eyeFilled from '../../assets/img/eyeFilled.svg';
import axios from "axios";

const InputContainer=styled.div`
    display: flex;
    flex-direction:column;
    gap: 9.5px;
    margin-bottom: 18.5px;
    position: relative;
`
const InputLabel=styled.label`
    color: #000;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.175px;
`
const InputBox=styled.div`
    display: flex;
    gap: 10px;
`
const Input=styled.input`
    display: flex;
    width: 346px;
    padding: 10px 32px 10px 10px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #787680;
    &::placeholder{
        color: #ADAAAF;
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.175px;
    }
    &:focus {
        outline: none; 
        border: 1px solid #100069;
    }
`

const EyeContainer=styled.div`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    position: absolute;
    right: 10px;
    bottom: 10px;
`

const Email = styled.input`
    border-radius: 5px;
    border: 1px solid #787680;
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
    border: 1px solid #787680;
    width: 171px;
    height: 35px;
    padding: 7px 0px 8px 12px;
    &:focus{
        outline:none;
    }
`;

const Signup = () => {
    const emailRef = useRef("");
    const [domain, setDomain] = useState('');
    const [showpw, setShowpw] = useState(false);

    const ChangeShow= () => {
        if (showpw){
            setShowpw(false);
        } else{
            setShowpw(true);
        }
    }

    const sendDomain = (e) => {
        setDomain(e.target.value)
    }

    return(
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <QuestionMode content={'OFI 회원님 \n 가입을 환영합니다!'} marginBottom={'6.27vh'}/>
                        {/* 이메일 */}
                        <InputContainer>
                            <InputLabel>이메일</InputLabel>
                            <f.Flex>
                                {/* inputemail값 가져오기-이 부분 고정시키기 */}
                                <Email placeholder="이메일 주소" ref={emailRef}></Email>
                                <Dot>@</Dot>
                                <Domain onChange={sendDomain}>
                                    <option value="">이메일을 선택해주세요.</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="icloud.com">icloud.com</option>
                                </Domain>
                            </f.Flex>
                        </InputContainer>
                        {/* 비밀번호*/}
                        <InputContainer>
                            <InputLabel>비밀번호</InputLabel>
                            <InputBox>
                                <Input type={showpw ? 'text' : 'password'} placeholder="비밀번호를 입력해주세요"></Input>
                                <EyeContainer onClick={ChangeShow}>
                                    <img src={showpw? eyeFilled: eyeUnfilled}></img>
                                </EyeContainer>
                            </InputBox>
                        </InputContainer>
                        {/* 전화번호 */}
                        <InputContainer>
                            <InputLabel>휴대폰 번호</InputLabel>
                            <Input type="tel" placeholder="휴대폰 번호를 -없이 입력해주세요"></Input>
                        </InputContainer>
                        <Link to="/modechoice">
                            <ButtonBottom content={'다음'} />
                        </Link>
                    </f.ScreenJoin>

                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default Signup;