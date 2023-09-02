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
    gap: 10px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #D8D9DA;
    border: 1px solid #D8D9DA;
`

const Button = (props) => {
    return (
        <Btn>
            {props.content}
        </Btn>
    );
};

export default Button;
