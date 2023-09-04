import React from "react";
import styled from 'styled-components';

const Box = styled.div`
    display: inline-flex;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #9A9A9A;
    background: #FFF;
`

const Content = styled.div`
    color: #9A9A9A;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
`

const SmallStyleCategoryBox = (props) => {
    return (
        <Box>
            <Content>
                {props.content}
            </Content>
        </Box>
    )
}

export default SmallStyleCategoryBox;