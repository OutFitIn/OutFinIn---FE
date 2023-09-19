import React, {useState} from 'react';
import styled from 'styled-components';
import fillMinHeart from "../../assets/img/fillMinHeart.svg";
import star from "../../assets/img/star.svg";
import money from "../../assets/img/money.svg";
import hanger from "../../assets/img/hanger.svg";

const Grade = styled.div`
    display: flex;
    margin-bottom: 1.30vh;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.048px;
    white-space: nowrap;
`
const GradeSection=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const GradeIcon = styled.img`
    margin-right: 5px;
`;

const GradeBar = styled.div`
    width: 1px;
    height: 1.65vh;
    background: #C4C4C4;
    margin: 0px 20px;
`
const Grades = (props) => {
    return(
    <Grade>
        <GradeSection>
            <GradeIcon src={fillMinHeart}/>
            {props.like}
            <GradeBar/>
        </GradeSection>
        <GradeSection>
            <GradeIcon src={star}/>
            4.48
            <GradeBar/>
        </GradeSection>
        <GradeSection>
            <GradeIcon src={money}/>
            10,000원 ~
            <GradeBar/>
        </GradeSection>
        <GradeSection>
            <GradeIcon src={hanger}/>
            {props.request}
        </GradeSection>
    </Grade>
    )
}
export default Grades;