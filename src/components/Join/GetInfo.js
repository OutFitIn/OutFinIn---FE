import React, { useState } from "react";
import styled from 'styled-components';
import * as f from '../Common/CommonStyle'
const InputInfos = styled.div`
    display: flex;
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
    width: 39px;
    border: none;
    outline: none;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        display: none;
    }
`;

const GetInfo = (props) => {
    return(
        <InputInfos infoName={props.infoName}>{props.infoName}
            <InputInfo></InputInfo>
        </InputInfos>
    )
}
export default GetInfo;