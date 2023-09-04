import React from 'react';
import styled from 'styled-components';
import * as f from '../../components/Common/CommonStyle';

const BodyBox = styled.div`
    color: ${(props) => (props.active ? '#FFF' : '#DCD9DD')};
    background: ${(props) => (props.active ? '#100069' : '#fff')};
    box-sizing: border-box;
    height: 125px;
    border-radius: 11px;
    border: 1px solid #E4E1EC;
    padding: 24px 0px 29px 32px;
    margin-bottom: ${(props) => (props.bodyName == '스트레이트' || props.bodyName == '웨이브'? '1.42vh' : '4.82vh')};
`

const BodyImg = styled.img`
    margin-right: 31px;
`

const BodyName = styled.div`
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08px;
    margin-bottom: 13px;
`

const BodyDescribe = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.014px;
    white-space: pre-line;
`

const BodyTpye = (props) => {
    const ChangeBoxColor = () => {
        props.bodyName == '스트레이트' ? props.choose(1) : props.bodyName == '웨이브' ? props.choose(2) : props.choose(3)
    }
    
    return (
        <BodyBox 
            bodyName={props.bodyName}
            onClick={ChangeBoxColor}
            active={props.selected}>
            <f.Flex>
                <BodyImg src={props.bodyImg}></BodyImg>
                <div>
                    <BodyName>{props.bodyName}</BodyName>
                    <BodyDescribe>{props.bodyDescribe}</BodyDescribe>
                </div>
            </f.Flex>
        </BodyBox>
    )
}
export default BodyTpye;