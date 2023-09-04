import React,{ useState } from "react";
import styled from 'styled-components';
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import { Link } from "react-router-dom";

const BodyTypeText = styled.div`
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
    margin-bottom: 14px;
`
const CoInfoGetProfile = () => {
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
                        <QuestionMode content={'코디네이터 님의\n 프로필을 작성해주세요'} marginBottom={'25px'}/>
                        <Link to="../getstyle">
                            <ButtonBottom content={'다음'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default CoInfoGetProfile;