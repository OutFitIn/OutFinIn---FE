import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import GetInfo from "../../components/Join/GetInfo";
import profileCircle from '../../assets/img/profileCircle.svg';

const Male = styled.div`
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

const Female = styled.div`
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
const GetPhotoContainer = styled.div`
    align-items: center;
    justify-content: center;
    margin-bottom: 4.14vh;
`

const Profile = styled.img`
    display: block;
    margin: 0 auto;
`
const TextContainer = styled.div`
    margin-top: 2.96vh;
    position:relative; 
    display:inline-block; 
    margin-bottom: 13.62vh;
`

const TextArea = styled.textarea`
    display: inline-flex;
    padding: 20px 15px 60px 15px;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
    border: 1px solid #C8C5D0;
    background: #FFF;
    width: 100%;
    &::placeholder{
		color: #C8C5D0;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.175px;
	}
`
const TextCount = styled.div`
    position:absolute; 
    right:20px; 
    bottom:20px; 
    color:#666; 
    font-size:15px;
`

const CoInfo = () => {
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [inputCount, setInputCount] = useState(0);
    const maxInputLength = 20; // 최대 입력 길이

    const changeGender = (g) => {
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    const onInputHandler = (e) => {
        const content = e.target.value;
        setInputCount(content.length);

        if (content.length > maxInputLength) {
            alert("최대 20자까지 입력 가능합니다.");
            e.target.value = content.substring(0, maxInputLength);
            setInputCount(maxInputLength);
        }
    };

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
                    <QuestionMode content={'코디네이터 님의\n 프로필을 작성해주세요'} marginBottom={'25px'}/>
                    {/*사진 입력받기*/}
                    <GetPhotoContainer>
                        <Profile src={profileCircle}></Profile>
                    </GetPhotoContainer>
                    {/*정보 입력받기*/}
                    <f.Flex>    
                        <GetInfo infoName={'닉네임'}/>
                        <Male 
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                        <Female 
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'키'}/>
                        <GetInfo infoName={'체중'}/>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'SNS 링크'}/>
                    </f.Flex>
                    {/*프로필 내용 입력받기 (1/50)-50글자 이내*/}
                    <TextContainer>
                        <TextArea onChange={onInputHandler} maxLength={maxInputLength} placeholder="프로필을 간단하게 적어주세요!"/>
                        <TextCount><span>{inputCount}</span><span>/20 자</span></TextCount>
                    </TextContainer>
                    <Link to="/getstyle">
                        <ButtonBottom content={'다음'} />
                    </Link>
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default CoInfo;