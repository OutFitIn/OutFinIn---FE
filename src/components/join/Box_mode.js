import React, { useState } from "react";
import styled from 'styled-components';
import coordinate from '../../assets/img/coordinate.svg';
import user from '../../assets/img/user.svg';

const Box = styled.div`
    display:flex;
    height: 168px;
    border-radius: 15px;
    color: ${(props) => (props.active ? '#FFF' : '#000')};
    background: ${(props) => (props.active ? '#61677A' : '#D8D9DA')};
    padding: 25px 8px 0px 26px;
    cursor: pointer;
    margin-bottom: ${(props) => (props.mode == '코디네이터 모드' ? '16px' : '0px')}
`;

const ModeName = styled.div`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.03px;
    margin-bottom: 44px;
    
`;

const ModeDescribe = styled.div` 
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04px;
`;
const BoxMode = (props) => {

    const ChangeBox = () => {
        props.mode === '코디네이터 모드' ? props.choose(1) : props.choose(2)
    }
    return(
        <Box mode={props.mode}
            active={props.selected}
            onClick={ChangeBox}>
            <div>
                <ModeName>{props.mode}</ModeName>
                <ModeDescribe>{props.describe}</ModeDescribe>
            </div>
            <img src={props.mode === '코디네이터 모드'? coordinate : user} style={{width:'50%'}}/>
           
        </Box>
        
    )
}
export default BoxMode;