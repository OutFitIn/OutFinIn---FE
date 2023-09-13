import React, { useState } from "react";
import styled from 'styled-components';
import * as f from '../Common/CommonStyle'
const InputInfos = styled.div`
    display: flex;
    justify-content: space-between;
    width: 157px;
    color: #E4E1EC;
    border-bottom: 1px solid #C8C5D0;
    padding: 10px 0px 10px 8px;
    font-size: 14px;
    font-weight: 700;
    margin-right: ${(props)=> (props.infoName == '키' || props.infoName == '닉네임' ? '20px' : '0px')};
    margin-top: ${(props)=> (props.infoName == '키' || props.infoName == '체중' ? '17px' : '0px')};
`;

const InputInfo = styled.input`
    width: ${(props)=>(props.infoName == '닉네임' ? '52px' : '35px')};
    border: none;
    outline: none;
    text-align: right;
    color: #000;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        display: none;
    }
`;

const Unit = styled.div`
    color: ${(props) => props.active ? '#000' : '#E4E1EC'};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`;

const InputUnit = styled.div`
    display:flex;
`;
const GetInfo = (props) => {
    
    return(
        <InputInfos infoName={props.infoName}>{props.infoName}
            <InputUnit>
                <InputInfo value={props.inputValue} onChange={props.changeValue} infoName={props.infoName}></InputInfo>
                <Unit active={props.inputValue !== ""}>{props.unit}</Unit>
            </InputUnit>
        </InputInfos>
    )
}
export default GetInfo;