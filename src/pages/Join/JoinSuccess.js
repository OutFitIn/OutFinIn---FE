import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import Hanger3D from '../../assets/img/3Dhanger.svg';

const Hanger3DImg = styled.img`
    margin: 0 auto;
`;

const JoinSuccess = () => {
    
    return(
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <f.Flex>
                            <ButtonNumbers content={1}/>
                            <ButtonNumbers content={2}/>
                            <ButtonNumbers content={3}/>
                            <ButtonNumbers content={4} isSelected={true}/>
                        </f.Flex>
                        <QuestionMode content={localStorage.getItem('mode') == 1 ? 
                        '회원가입이 완료 되었습니다!\n 오늘도 예쁜 코디 부탁드려요':
                        '회원가입이 완료 되었습니다! \n오늘도 딱 맞는 코디 받으세요'} marginBottom={'2.96vh'}/>
                        <Hanger3DImg src={Hanger3D}></Hanger3DImg> 
                        <Link to={localStorage.getItem('mode') == 1 ? 
                        "../outermainpage":
                        "../usermainpage"} style={{ textDecoration: 'none' }}>
                            <ButtonBottom content={'시작하기'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}
export default JoinSuccess;