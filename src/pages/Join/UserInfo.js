import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import BodyTpye from "../../components/Join/BodyType";
import bodyStraight from '../../assets/img/bodyStraight.svg';
import bodyWave from '../../assets/img/bodyWave.svg';
import bodyNatural from '../../assets/img/bodyNatural.svg';
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
const UserInfo = () => {
    const [straight,setStraight] = useState(false);
    const [wave,setWave] = useState(false);
    const [natural,setNatural] = useState(false);
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

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

    const changeGender = (g) => {
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
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
                    <f.Flex>
                        <GetInfo infoName={'닉네임'}/>
                        <Female 
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                        <Male 
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'키'} unit={'cm'}/>
                        <GetInfo infoName={'체중'} unit={'kg'}/>
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
                        bodyDescribe={'목이 가늘고 긴 편 둥글고 얇은 어깨\n상반신 보다 하반신 볼륨이 발달'}/>
                    <Link to="../getstyle" style={{ textDecoration: 'none' }}>
                        <ButtonBottom content={'다음'} />
                    </Link>
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default UserInfo;