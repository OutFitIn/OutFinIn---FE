import React from 'react';
import styled from 'styled-components';

const BtnContainer = styled.div`
    display: inline-block; /* Flexbox를 사용하여 자식 요소를 가로로 정렬합니다. */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
`

const Btn = styled.div`
    width: 25px;
    height: 25px;
    background: black;
    border-radius: 15px;
    margin-right: 10px;
`

const Btn_in = styled.div`
    color: #FFF;
    padding: 4px;
    text-align: center;
    line-height: normal;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 12.706px;
    font-style: normal;
    font-weight: 700;
`

const Button_numbers = (props) => {
    return (
        <BtnContainer>
            <Btn>
                <Btn_in>
                    {props.content}
                </Btn_in>
            </Btn>
        </BtnContainer>
    );
};

export default Button_numbers;
