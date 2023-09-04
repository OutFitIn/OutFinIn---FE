import React,{ useState } from "react";
import styled from 'styled-components';
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import BodyTpye from "../../components/Join/BodyType";
import bodyStraight from '../../assets/img/bodyStraight.svg';
import bodyWave from '../../assets/img/bodyWave.svg';
import bodyNatural from '../../assets/img/bodyNatural.svg';

const BodyTypeText = styled.div`
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
    margin-bottom: 14px;
`
const UserInfo = () => {
    const [bodyStraights,setBodyStraight] = useState(false);
    const [bodyWaves,setbodyWave] = useState(false);
    const [bodyNaturals,setbodyNatural] = useState(false);

    const choose = (x) => {
        if(x == 1){
            setBodyStraight(true);
            setbodyWave(false);
            setbodyNatural(false)
        }
    }
    return(
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <ButtonNumbers content={1} />
                        <ButtonNumbers content={2}/>
                        <ButtonNumbers content={3}/>
                        <ButtonNumbers content={4}/>
                        <ButtonNumbers content={5}/>
                        <QuestionMode content={'더 정확한 추천을 위해 회원님의 \n 정보를 수집하고 있어요'} />
                        {/* 체형 선택 */}
                        <BodyTypeText>체형</BodyTypeText>
                        <BodyTpye
                            bodyImg={bodyStraight}
                            bodyName={'스트레이트'}
                            choose={choose}
                            selected={bodyStraights}
                            bodyDescribe={'목이 다소 짧고 승모근이 발달\n바스트 라인이 높고 볼륨감이 있는 편'}/>
                        <BodyTpye
                            bodyImg={bodyWave}
                            bodyName={'웨이브'}
                            choose={choose}
                            selected={bodyWaves}
                            bodyDescribe={'목이 가늘고 긴 편 둥글고 얇은 어깨\n상반신 보다 하반신 볼륨이 발달'}/>
                        <BodyTpye
                            bodyImg={bodyNatural}
                            bodyName={'내추럴'}
                            choose={choose}
                            selected={bodyNaturals}
                            bodyDescribe={'목이 가늘고 긴 편 둥글고 얇은 어깨\n상반신 보다 하반신 볼륨이 발달'}/>
                    </f.ScreenJoin>
                </f.ScreenComponent>
                <ButtonBottom content={'다음'} />
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default UserInfo;