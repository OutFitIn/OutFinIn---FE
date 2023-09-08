import React, { useState } from "react";
import styled from 'styled-components';
import coordinate from '../../assets/img/coordinate.svg';
import user from '../../assets/img/user.svg';

const Box = styled.div`
    display:flex;
    justify-content: space-between;
    height: 19.9vh;
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
    margin-bottom: 5.21vh;
`;

const ModeDescribe = styled.div`
    position: absolute;
    z-index:20;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04px;
    margin-bottom: 2.84vh;
    white-space: pre-line;
`;

const BoxMode = (props) => {

    const ChangeBox = () => {
        props.mode === '아우터 모드' ? props.choose(1) : props.choose(2)
    }
    return(
        <Box mode={props.mode}
            active={props.selected}
            onClick={ChangeBox}>
            <div>
                <ModeName>{props.mode}</ModeName>
                <ModeDescribe>{props.describe}</ModeDescribe>
            </div>
            <img src={props.mode === '아우터 모드'? coordinate : user}/> 
        </Box>
        
    )
}
export default BoxMode;