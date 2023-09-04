import React from "react";
import styled from "styled-components";

const ExplContainer = styled.div`
    margin-bottom: 7.34vh;
    width: 240px;
    color: var(--material-theme-sys-light-outline-variant, #C8C5D0);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.048px;
`

const ExplOfQues = (props) => {
    return (
        <div>
            <ExplContainer>
                {props.content}
            </ExplContainer>
        </div>
    )
}

export default ExplOfQues