import react from "react";
import styled from 'styled-components';

const QuestionContainer = styled.div`
    margin-top: 27px;
    margin-bottom: ${props => props.marginBottom};
`
const Question = styled.div`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: pre-line;
`

const QuestionMode = (props) => {
    return (
        <div>
            <QuestionContainer marginBottom={props.marginBottom}>
                <Question>
                    {props.content}
                </Question>
            </QuestionContainer>
        </div>
    )
};

export default QuestionMode;