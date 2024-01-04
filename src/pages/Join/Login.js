import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import logo from "../../assets/img/logo.svg"
import naver from "../../assets/img/naver.svg"
import kakao from "../../assets/img/kakao.svg"
import google from "../../assets/img/google.svg"
import axios from "axios";
// 소셜로그인
import { KAKAO_AUTH_URL } from "../../LinkAuth/kakaoAuth.js";
import { NAVER_AUTH_URL } from "../../LinkAuth/NaverAuth.js";
import { GOOGLE_AUTH_URL } from "../../LinkAuth/GoogleAuth.js"; 
 
const LoginContainer=styled.div`
    margin-top: 87.33px;
    border: 1px; solid #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoContainer=styled.div`
    margin-bottom: 82px;
`

const LoginForm=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const GetInfoContainer=styled.div`
    margin-bottom: 7px;
    width: 100%;
    cursor: pointer;
`

const InputInfo = styled.input`
    border: none;
    border-bottom: 2px solid var(--material-theme-sys-light-outline-variant, #C8C5D0);        
    padding: 10px;
    cursor: pointer;
    &::placeholder{
        color: var(--material-theme-ref-neutral-variant-neutral-variant-80, #C8C5D0);
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.175px;
    }
    &:focus{
        outline: none;
        border-bottom: 2px solid #100069;
    }
    border-width: 0 0 1px;
    width: 100%;
`

const SocialInfoContainer=styled.div`
    margin-top: 23px;
    display: flex;
    flex-direction: column;
    color: var(--material-theme-ref-neutral-neutral-80, #C9C5CA);
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
    text-align: center;
`
const SocialLogo=styled.div`
    margin-top: 9px;
    display: flex; /* 플렉스 컨테이너를 사용합니다. */
    align-items: center; /* 아이템을 수직으로 가운데 정렬합니다. */
    gap: 7px; /* 각 아이템 간에 5px 간격을 추가합니다. */
`

const LogoImg=styled.div`
    margin-right:2px;
    width: 40px;
    cursor: pointer;
`

const SignUp=styled.div`
    margin-top: 21px;
    color: var(--material-theme-ref-neutral-neutral-80, #C9C5CA);
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.175px;
    cursor: pointer;
`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const idRef = useRef();

    useEffect(() => {
        idRef.current.focus();
    }, [])

    const changeId = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const loginHandler = () => {
        async function fetchData(){
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.post("https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/login",
                {
                    email : email,
                    password : password
                });

                if(res.data === 'coordinator') {
                    console.log(password);
                    localStorage.setItem('mode', 1)
                    navigate('/outermainpage');
                }
                else if(res.data === 'user') {
                    console.log(password);
                    localStorage.setItem('mode', 2)
                    navigate('/usermainpage');
                }else {
                    console.log(res.data);
                }

                // res.data 가 outer, fiter 로 나눠서 보내줌
                // 단, 실패 시 이메일이 틀린 경우: Email Not Found  /  비밀번호가 틀린 경우: Password Not Equal
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchData();
    }

    return(
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <LoginContainer>
                        {/* 로고 */}
                        <LogoContainer>
                            <img src={logo} />
                        </LogoContainer>
                        {/* 전체 폼 */}
                        <LoginForm>
                            {/* 아이디, 비번 입력 */}
                            <GetInfoContainer>
                                <InputInfo type="text" placeholder='아이디를 입력해주세요' onChange={changeId} ref={idRef}/>
                            </GetInfoContainer>
                            <GetInfoContainer>
                                <InputInfo type="password" placeholder='비밀번호를 입력해주세요' onChange={changePassword} />
                            </GetInfoContainer>
                            {/* 소셜미디어 연동 */}
                            <SocialInfoContainer>
                                <div>소셜 로그인 연동하기</div>
                                <SocialLogo>
                                    <LogoImg><a href={NAVER_AUTH_URL}><img src={naver} /></a></LogoImg>
                                    <LogoImg><a href={KAKAO_AUTH_URL}><img src={kakao} /></a></LogoImg>
                                    <LogoImg><a href={GOOGLE_AUTH_URL}><img src={google} /></a></LogoImg>
                                </SocialLogo>
                            </SocialInfoContainer>
                            {/* 회원가입 */}
                            <Link to="/inputemail" style={{ textDecoration: 'none' }}>
                                <SignUp>회원가입</SignUp>
                            </Link>
                        </LoginForm>
                    </LoginContainer>


                    {/* 코드 수정-로그인 버튼 눌렀을 때, 로그인 성공이면 넘어가기!! 백엔드와 연동 */}
                    <Link onClick={loginHandler}>
                        <ButtonBottom content={'로그인'} />
                    </Link>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default Login;