import React, { useState } from "react";
import styled from 'styled-components';
import coordinate from '../../assets/img/coordinate.svg';
import user from '../../assets/img/user.svg';

const Box = styled.div`
    display:flex;
    height: 19.9vh;
    border-radius: 15px;
    color: ${(props) => (props.active ? '#FFF' : '#000')};
    background: ${(props) => (props.active ? '#100069' : '#E4E1EC')};
    padding: 25px 8px 0px 26px;
    cursor: pointer;
    margin-bottom: ${(props) => (props.mode === '코디네이터 모드' ? '16px' : '0.35vh;')}
`;

const ModeName = styled.div`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.03px;
    margin-bottom: 5.21vh;
`;

const ModeDescribe = styled.div` 
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04px;
    margin-bottom: 24px;
`;

const Img = styled.img`
    margin: 2.48vh 0;
`
const Content = styled.div`
    // margin-bottom: 2.84vh;
`

const BoxMode = (props) => {

    const ChangeBox = () => {
        props.mode === '코디네이터 모드' ? props.choose(1) : props.choose(2)
    }
    return(
        <Box mode={props.mode}
            active={props.selected}
            onClick={ChangeBox}>
            <Content>
                <ModeName>{props.mode}</ModeName>
                <ModeDescribe>{props.describe}</ModeDescribe>
            </Content> 
            <Img src={props.mode === '코디네이터 모드'? coordinate : user} style={{width:'50%'}} /> 
           
        </Box>
        
    )
}
export default BoxMode;