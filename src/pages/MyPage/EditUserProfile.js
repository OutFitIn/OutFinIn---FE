import React,{ useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import GobackContainer from "../../components/Common/GobackContainer";
import BodyTpye from "../../components/Join/BodyType";
import Navigation from "../../components/Navigation/Navigation";
import bodyStraight from '../../assets/img/bodyStraight.svg';
import bodyWave from '../../assets/img/bodyWave.svg';
import bodyNatural from '../../assets/img/bodyNatural.svg';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import GetInfo from "../../components/Join/GetInfo";

const BodyTypeText = styled.div`
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
    margin-bottom: 14px;
    margin-top: 3.21vh;
`

const Male = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-left: 0px solid #fff;
    border-radius: 0px 10px 11px 0px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const Female = styled.div`
    margin-left: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-right: 0px solid #fff;
    border-radius: 10px 0px 0px 11px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const InputContaier=styled.div`
    display: flex;
    align-items: center;
`

const TopEdit = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8.17vh;
`;

const DoneText = styled.div`
    color: #4F44E2;
    cursor: pointer;
    margin-top: 36px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.2px;
`;

const EditUserProfile= () => {
    const [straight,setStraight] = useState(false);
    const [wave,setWave] = useState(false);
    const [natural,setNatural] = useState(false);
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [pass, setPass] = useState(false);
    const [nickname, setNickname] = useState("");
    const [curValue, setCurValue] = useState({
        nickname: "",
        height: "",
        weight: "",
        gender: "",
        shape: ""
        // styles: [],
    });
    const [checkNickname, setCheckNickname] = useState("");
    const nicknameRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutside = async ({ target }) => {

        if (nicknameRef.current && !nicknameRef.current.contains(target) && checkNickname !== nickname) {
            // axios 코드 작성 하면 됨
            async function fetchNickname(){
                try {
                    axios.defaults.withCredentials=true;
                    const res = await axios.get("http://localhost:8080/check/nickname?nickname="+ nickname);
                    if(res.data === 'available') {
                        setPass(true);
                        setCheckNickname(nickname); // 검사를 완료한 닉네임

                    } else {
                        setPass(false);
                    }
                  } catch (error) {
                    console.error(error);
                  }
            }
    
            fetchNickname();
        }
    };
    

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nickname]);

    const choose = (x) => {
        if(x === 1){
            setStraight(true);
            setWave(false);
            setNatural(false);
        } else if(x === 2){
            setStraight(false);
            setWave(true);
            setNatural(false);
        } else{
            setStraight(false);
            setWave(false);
            setNatural(true);
        }
    }

    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const changeHeight = (e) => {
        setHeight(e.target.value);
    }

    const changeWeight = (e) => {
        setWeight(e.target.value);
    }

    const changeGender = (g) => {
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    // 값 불러오는 백엔드 통신
    useEffect(()=>{
        async function fetchEditPage(){
        try{
            axios.defaults.withCredentials=true;
            const res = await axios.get("http://localhost:8080/user/info");
            setCurValue(res.data);
            setNickname(res.data.nickname);
            setHeight(res.data.height);
            setWeight(res.data.weight);
            if (res.data.gender === 'MALE') {
                setMale(true);
            } else if (res.data.gender === 'FEMALE') {
                setFemale(true);
            }

            if (res.data.shape === 'STRAIGHT') {
                setStraight(true);
            } else if (res.data.shape === 'WAVE') {
                setWave(true);
            } else if(res.data.shape === 'NATURAL'){
                setNatural(true);
            }
            
        }catch(error){
            console.error(error);
        }
    }
        fetchEditPage();
    }, [])

    //편집 적용
    const reSave = () => {
        async function fetchReSavePage(){
            try{
              axios.defaults.withCredentials=true;
              const res = await axios.post("http://localhost:8080/user/edit",
              {
                id : 1,
                nickname : nickname,
                height : height,
                weight : weight,
                gender : male ? 'MALE' : 'FEMALE',
                shape : straight ? 'STRAIGHT' : wave ? 'WAVE' : 'NATURAL'
              });
              navigate('/usermypage');
            }catch(error){
              console.error(error.config.data);
            }
          }
          fetchReSavePage();
    }
    
    return(
        <f.Totalframe>
            <f.ScreenComponent>
            <TopEdit>
                <GobackContainer/>
                <DoneText onClick={reSave}>완료</DoneText>
            </TopEdit>
            {/* 개인정보 입력 */}
            <InputContaier>
                <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} check={nicknameRef}/>
                <AiOutlineCheckCircle fill={pass? '#4F44E2' : '#C9C5CA'}/>
                <Female 
                    onClick={() => changeGender(2)}
                    selected={female}>여</Female>
                <Male 
                    onClick={() => changeGender(1)}
                    selected={male}>남</Male>
            </InputContaier>
            <f.Flex>
                <GetInfo infoName={'키'} unit={'cm'} inputValue={height} changeValue={changeHeight}/>
                <GetInfo infoName={'체중'} unit={'kg'} inputValue={weight} changeValue={changeWeight}/>
            </f.Flex>

            {/* 체형 선택 */}
            <BodyTypeText>체형</BodyTypeText>
            <BodyTpye
                bodyImg={bodyStraight}
                bodyName={'스트레이트'}
                choose={choose}
                selected={straight}
                bodyDescribe={'목이 다소 짧고 승모근이 발달\n바스트 라인이 높고 볼륨감이 있는 편'}/>
            <BodyTpye
                bodyImg={bodyWave}
                bodyName={'웨이브'}
                choose={choose}
                selected={wave}
                bodyDescribe={'목이 가늘고 긴 편 둥글고 얇은 어깨\n상반신 보다 하반신 볼륨이 발달'}/>
            <BodyTpye
                bodyImg={bodyNatural}
                bodyName={'내추럴'}
                choose={choose}
                selected={natural}
                bodyDescribe={'가슴과 허리 위치가 높은 편\n신체 중심이 높고 어깨가 발달'}/>
            </f.ScreenComponent>
            <Navigation type={'mypage'}/>
        </f.Totalframe>
    )
}
export default EditUserProfile;