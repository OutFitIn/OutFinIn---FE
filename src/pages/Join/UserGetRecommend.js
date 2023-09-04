import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';


const UserGetRecommend = () => {

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
                        <QuestionMode content={'회원님이 선택으로 추천된\n 코디네이터에요!'} marginBottom={'2.96vh'}/>


                        <Link to="../joinsuccess" style={{ textDecoration: 'none' }}>
                            <ButtonBottom content={'다음'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default UserGetRecommend;