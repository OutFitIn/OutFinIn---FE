// '다음' or '로그인' 버튼.js
import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    display: flex;
    width: 354px;
    height: 60px;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #100069;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    line-height: normal;
    letter-spacing: 0.08px;
    position: fixed;
    bottom: 28px;
    text-decoration: none;
`

const ButtonBottom = (props) => {

    return (
        <Btn onClick={props.type === 'axios' ? props.sendInfo : null}>
            {props.content}
        </Btn>
    );
};

export default ButtonBottom;
