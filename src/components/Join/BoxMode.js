import React, { useState } from "react";
import styled from 'styled-components';
import coordinate from '../../assets/img/coordinate.svg';
import user from '../../assets/img/user.svg';

const Box = styled.div`
    display:flex;
    justify-content: space-between;
    height: 175px;
    border-radius: 15px;
    color: ${(props) => (props.active ? '#FFF' : '#000')};
    background: ${(props) => (props.active ? '#100069' : '#E4E1EC')};
    padding: 2.96vh 8px 2.84vh 26px;
    cursor: pointer;
    margin-bottom: ${(props) => (props.mode === '아우터 모드' ? '16px' : '0px;')};
`;

const ModeName = styled.div`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.03px;
`;

const ModeRole=styled.div`
    color: #928F9A;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.021px;
    margin-bottom: 4.21vh;
`

const ModeDescribe = styled.div`
    position: absolute;
    z-index:20;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04px;
    margin-bottom: 3.84vh;
    white-space: pre-line;
`;

const ModeImg=styled.img`
    width: 130px;
    height: 130px;
`
const BoxMode = (props) => {
    const ChangeBox = () => {
        props.mode === '아우터 모드' ? props.choose(1) : props.choose(2);
        props.mode === '아우터 모드' ? localStorage.setItem('mode', 1) : localStorage.setItem('mode',2) 
    }
    return(
        <Box mode={props.mode}
            active={props.selected}
            role={props.role}
            onClick={ChangeBox}>
            <div>
                <ModeName>{props.mode}</ModeName>
                <ModeRole>{props.role}</ModeRole>
                <ModeDescribe>{props.describe}</ModeDescribe>
            </div>
            <ModeImg src={props.mode === '아우터 모드'? coordinate : user}></ModeImg>
        </Box>
        
    )
}
export default BoxMode;