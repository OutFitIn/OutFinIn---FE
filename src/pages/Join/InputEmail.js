import React,{ useRef,useState,useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import QuestionMode from '../../components/Join/QuestionModeBox';
import TopModal from "../../components/Join/TopModal";
import eyeUnfilled from '../../assets/img/eyeUnfilled.svg';
import eyeFilled from '../../assets/img/eyeFilled.svg';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import axios from "axios";

const InputContainer=styled.div`
    display: flex;
    flex-direction:column;
    gap: 9.5px;
    margin-top: 18.5px;
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
    cursor: pointer;
`
const Input=styled.input`
    display: flex;
    width: 346px;
    padding: 10px 32px 10px 10px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #787680;
    cursor: pointer;
    &::placeholder{
        color: #ADAAAF;
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.175px;
        cursor: pointer;
    }
    &:focus {
        outline: none; 
        border: 2px solid #100069;
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
    border: 1px solid ${props=> props.error? '#fb0102': '#787680'};
    width: 151px;
    height: 35px;
    padding-left: 12px;
    cursor: pointer;
    &:focus{
        outline:none;
        border: 2px solid ${props=> props.error? '#fb0102': '#100069'};
    }
`;

const Domain = styled.select`
    border-radius: 5px;
    border: 1px solid ${props=> props.error? 'red': '#787680'};
    width: 171px;
    height: 35px;
    padding: 7px 0px 8px 12px;
    cursor: pointer;
    &:focus{
        outline:none;
        border: 2px solid ${props=> props.error? '#fb0102': '#100069'};
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


const AuthenticateCode = styled.div`
    display:flex;
    justify-content: space-between;
    width:100%;
    margin-top:15px;
    display: inline-flex;
    padding: 5px 0px 5px 10px;
    align-items: center;
    border-bottom:  ${(props)=> props.getNum? '2px': '1px'} solid ${(props)=> props.getNum? '#100069': '#787680'}; 
`;

const AuthenticateInput = styled.input`
    border:none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.175px;
    cursor: pointer;
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
    const navigate = useNavigate();
    const emailRef = useRef("");
    const [domain, setDomain] = useState('');
    const [checkFill, setCheckFill] = useState('#C9C5CA');
    const [pass, setPass] = useState(false);
    const [timer,setTimer] = useState(300);
    const [min,setMin] = useState(5);
    const [sec,setSec] = useState(0);
    const [showpw, setShowpw] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [modal,setModal] = useState(false);
    const [getNum, setGetNum] = useState(false);  //이메일이 중복되지 않았을 때, 인증번호 칸 상태 관리


    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const ChangeShow= () => {
        if (showpw){
            setShowpw(false);
        } else{
            setShowpw(true);
        }
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const sendDomain = (e) => {
        setDomain(e.target.value)
    }
    
    // 이메일 중복검사와 코드 발송
    const sendEmail = () => {
        let Email = emailRef.current.value + '@' + domain;
        setTimeout(() => {
            setModal(false);
          }, 2500);
        async function fetchEmail(){
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/email/code/send?email="+Email);
                //중복되는 경우
                if(res.data === 'duplicate') {
                    emailRef.current.value='';
                    setDuplicateEmail(true);
                } 
                // 중복되지 않는 경우 메일 전송, 이메일 전송 성공 모달 띄어주기
                else{
                    setTimer(timer => timer - 1);
                    setDuplicateEmail(false);
                    setModal(true);
                    setGetNum(true); // 중복되지 않는 경우, 인증번호 칸 활성화
                }
              } catch (error) {
                console.error(error);
              }              
        }

        fetchEmail();
    }

    // 타이머 시작
    useEffect(() => {
        if(timer == 300){
            setMin(Math.floor(timer/60));
            setSec(timer%60);
            return;
        }
        const id = setInterval(() => {
            setTimer(timer => timer - 1);
            setMin(Math.floor(timer/60));
            setSec(timer%60);
        }, 1000);
        if(timer === -1){
            clearInterval(id);
            setTimer(300);
        }
        return () => clearInterval(id);
    }, [timer]);

  // 모달을 렌더링 후 3초 후에 모달 숨김
  useEffect(() => {
    const modalHideTimer = setTimeout(() => {
      setModal(false);
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 클리어
    return () => clearTimeout(modalHideTimer);
  }, []);

    // 코드 확인 
    const inputCode = (e) => {
        let code = e.target.value
        if(code.length == 4){
            let Email = emailRef.current.value + '@' + domain;

            async function fetchCode(){
                try {
                    axios.defaults.withCredentials=true;
                    const res = await axios.post("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/email/code/auth",
                    {
                        email : Email,
                        code : code
                    });
                    if(res.data == 'success!'){
                        setEmail(Email);
                        setPass(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchCode()
        }
    }

    // 코디네이터 이메일/ 비밀번호 전송
    const sendData = () => {
        async function fetchData(){
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.post("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/register",
                {
                    email : email,
                    password : password
                });

                if(res.data === 'success') {
                    navigate("/modechoice");
                }
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
                    <TopModal show={modal} content={"이메일이 성공적으로 보내졌습니다."}/>
                    <f.ScreenJoin email={true}>
                        <QuestionMode content={'서비스 이용 시작 전\n본인인증이 필요합니다.'} marginBottom={'6.27vh'}/>
                        <f.Flex>
                            <Email placeholder={duplicateEmail? "이미 가입한 이메일":"이메일 주소"} error={duplicateEmail} ref={emailRef}></Email>
                            <Dot>@</Dot>
                            <Domain onChange={sendDomain} error={duplicateEmail}>
                                <option value="">이메일을 선택해주세요.</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="nate.com">nate.com</option>
                                <option value="icloud.com">icloud.com</option>
                            </Domain>
                        </f.Flex>
                        {pass? (
                            <InputContainer>
                                <InputLabel>비밀번호</InputLabel>
                                <InputBox>
                                    <Input type={showpw ? 'text' : 'password'} placeholder="비밀번호를 입력해주세요" onChange={changePassword} getNum={getNum}></Input>
                                    <EyeContainer onClick={ChangeShow}>
                                        <img src={showpw? eyeFilled: eyeUnfilled}></img>
                                    </EyeContainer>
                                </InputBox>
                            </InputContainer>
                        ) : (
                            <AuthenticateCode getNum={getNum}>
                                <AuthenticateInput placeholder="인증 코드를 입력해주세요" onChange={inputCode} ></AuthenticateInput>
                                <div style={{display:'flex'}}>
                                    <Time>{min}:{sec< 10 ? '0' + sec : sec}</Time>
                                    <AiOutlineCheckCircle fill={pass? '#4F44E2' : '#C9C5CA'}/>
                                </div>
                            </AuthenticateCode>
                        )}
                        <AuthenticateText onClick={sendEmail}>인증 코드를 못 받았아요</AuthenticateText>
                        <Link onClick={pass ? sendData : sendEmail}>
                            <ButtonBottom content={pass ? '다음' : '메일 받기'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default InputEmail;