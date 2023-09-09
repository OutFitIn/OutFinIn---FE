import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import logo from "../../assets/img/logo.svg"
import naver from "../../assets/img/naver.svg"
import kakao from "../../assets/img/kakao.svg"
import google from "../../assets/img/google.svg"

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
`

const InputInfo = styled.input`
    padding: 10px;
    &::placeholder{
        color: var(--material-theme-ref-neutral-variant-neutral-variant-80, #C8C5D0);
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.175px;
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
`

const Login = () => {

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
                                <InputInfo placeholder='아이디를 입력해주세요'/>
                            </GetInfoContainer>
                            <GetInfoContainer>
                                <InputInfo placeholder='비밀번호를 입력해주세요'/>
                            </GetInfoContainer>
                            {/* 소셜미디어 연동 */}
                            <SocialInfoContainer>
                                <div>소셜 로그인 연동하기</div>
                                <SocialLogo>
                                    <LogoImg><img src={naver} /></LogoImg>
                                    <LogoImg><img src={kakao} /></LogoImg>
                                    <LogoImg><img src={google} /></LogoImg>
                                </SocialLogo>
                            </SocialInfoContainer>
                            {/* 회원가입 */}
                            <Link to="/inputemail" style={{ textDecoration: 'none' }}>
                                <SignUp>회원가입</SignUp>
                            </Link>
                        </LoginForm>
                    </LoginContainer>


                    {/* 코드 수정-로그인 버튼 눌렀을 때, 로그인 성공이면 넘어가기!! 백엔드와 연동 */}
                    <Link to="/main" style={{ textDecoration: 'none' }}>
                        <ButtonBottom content={'로그인'} />
                    </Link>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default Login;