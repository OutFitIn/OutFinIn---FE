import React,{ useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from "axios";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import BodyTpye from "../../components/Join/BodyType";
import bodyStraight from '../../assets/img/bodyStraight.svg';
import bodyWave from '../../assets/img/bodyWave.svg';
import bodyNatural from '../../assets/img/bodyNatural.svg';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import GetInfo from "../../components/Join/GetInfo";

const BodyTypeText = styled.div`
    color: ${(props)=> (props.nowinput?'#100069':'#E4E1EC')};
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
    cursor: pointer
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
    cursor: pointer
`

const InputContaier=styled.div`
    display: flex;
    align-items: center;
`
const UserInfo = () => {
    const [isClicked, setIsClicked]=useState('');
    const [straight,setStraight] = useState(false);
    const [wave,setWave] = useState(false);
    const [natural,setNatural] = useState(false);
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [pass, setPass] = useState(false);
    const [nickname, setNickname] = useState("");

    const [checkNickname, setCheckNickname] = useState("");
    const nicknameRef = useRef(null);

    const handleClickOutside = async ({ target }) => {

        if (nicknameRef.current && !nicknameRef.current.contains(target) && checkNickname !== nickname) {
            // axios 코드 작성 하면 됨
            async function fetchNickname(){
                try {
                    axios.defaults.withCredentials=true;
                    const res = await axios.get("http://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/check/nickname?nickname="+ nickname);
    
                    if(res.data === 'available') {
                        setPass(true);
                        setCheckNickname(nickname); // 검사를 완료한 닉네임

                    } else {
                        setPass(false);
                        setCheckNickname('');
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
        setIsClicked('성별');
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    const UserInfoData = () => {
        
        async function fetchUser(){
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.post("http://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/user/profile",
                {
                    nickname : nickname,
                    height : height,
                    weight : weight,
                    gender : male ? 'MALE' : 'FEMALE',
                    shape : straight ? 'STRAIGHT' : wave ? 'WAVE' : 'NATURAL'
                });
                console.log(res)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }
    return(
        <f.Totalframe>
            <f.ScreenComponent>
                <f.ScreenJoin>
                    <f.Flex>
                        <ButtonNumbers content={1}/>
                        <ButtonNumbers content={2} isSelected={true}/>
                        <ButtonNumbers content={3}/>
                        <ButtonNumbers content={4}/>
                    </f.Flex>
                    <QuestionMode content={'더 정확한 추천을 위해 회원님의 \n 정보를 수집하고 있어요'} marginBottom={'2.87vh'}/>
                    {/* 개인정보 입력 */}
                    <InputContaier>
                        <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} check={nicknameRef} click={()=>setIsClicked('닉네임')} nowinput={isClicked==='닉네임'}/>
                        <AiOutlineCheckCircle fill={pass? '#4F44E2' : '#C9C5CA'}/>
                        <Female 
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                        <Male 
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                    </InputContaier>
                    <f.Flex>
                        <GetInfo infoName={'키'} unit={'cm'} inputValue={height} changeValue={changeHeight} click={()=>setIsClicked('키')} nowinput={isClicked==='키'}/>
                        <GetInfo infoName={'체중'} unit={'kg'} inputValue={weight} changeValue={changeWeight} click={()=>setIsClicked('체중')} nowinput={isClicked==='체중'}/>
                    </f.Flex>

                    {/* 체형 선택 */}
                    <BodyTypeText nowinput={isClicked==='체형'}>체형</BodyTypeText>
                    <BodyTpye 
                        click={()=>setIsClicked('체형')}
                        bodyImg={bodyStraight}
                        bodyName={'스트레이트'}
                        choose={choose}
                        selected={straight}
                        bodyDescribe={'목이 다소 짧고 승모근이 발달\n바스트 라인이 높고 볼륨감이 있는 편'}/>
                    <BodyTpye
                        click={()=>setIsClicked('체형')}
                        bodyImg={bodyWave}
                        bodyName={'웨이브'}
                        choose={choose}
                        selected={wave}
                        bodyDescribe={'목이 가늘고 긴 편 둥글고 얇은 어깨\n상반신 보다 하반신 볼륨이 발달'}/>
                    <BodyTpye
                        click={()=>setIsClicked('체형')}
                        bodyImg={bodyNatural}
                        bodyName={'내추럴'}
                        choose={choose}
                        selected={natural}
                        bodyDescribe={'가슴과 허리 위치가 높은 편\n신체 중심이 높고 어깨가 발달'}/>
                    <Link to="/getstyle">
                        <ButtonBottom content={'다음'} sendInfo={UserInfoData} type={'axios'}/>
                    </Link>
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default UserInfo;