import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';


const CoUploadMainPicture = () => {

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
                        <QuestionMode content={'코디네이터님의 대표 코디\n 사진을 업로드 해주세요!'} marginBottom={'2.96vh'}/>


                        <Link to="../joinsuccess" style={{ textDecoration: 'none' }}>
                            <ButtonBottom content={'다음'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default CoUploadMainPicture;