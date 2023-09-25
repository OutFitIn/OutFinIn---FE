import React from 'react';
import styled from "styled-components";

const TotalBottomPrice = styled.div`
    display:flex;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    padding: 13px 40px 5px 40px;
    width: 390px;
    height: 15.40vh;
    border-top: 1px solid #C4C4C4;
    position: fixed;
    bottom: 0;
`

const SubBottomPrcie = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: left;
`;

const TagCodi = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
`;

const Tag = styled.div`
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.175px;
    margin-right: 5px;
`;

const Prcie = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.024px;
`;

const Chat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    background: #4F44E2;
    color: #FFF;
    width: 118px;
    cursor: pointer;

    /* Subtitle1 */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.024px;
`;

const BottomPrice = (props) => {
    

    return(
        <TotalBottomPrice>
            <SubBottomPrcie>
                <div>
                    <TagCodi>
                        <Tag>#미니멀</Tag>
                        코디 가격
                    </TagCodi>
                    <Prcie>1만원~</Prcie>
                </div>
                <Chat onClick={props.createChatRoom}>채팅 보내기</Chat>
            </SubBottomPrcie>
        </TotalBottomPrice>
    )
}
export default BottomPrice;