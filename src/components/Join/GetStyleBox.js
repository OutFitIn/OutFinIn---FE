import React from "react";
import styled from 'styled-components';

const Box = styled.div`
    display: inline-flex;
    padding: 7px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid ${(props) => (props.isSelected ? '#100069' : '#787680')};
    background: ${(props) => (props.isSelected ? '#100069' : '#FFF')};
    color: ${(props) => (props.isSelected ? '#FFF' : '#787680')};
    margin-right: 12px;
    margin-bottom: 1.42vh;
`

const Content = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.175px;
`

const GetStyleBox = (props) => {
    return (
        <Box isSelected={props.isSelected} onClick={props.onClick}>
            <Content>
                {props.content}
            </Content>
        </Box>
    )
}

export default GetStyleBox;