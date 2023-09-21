import React from 'react';
import styled from 'styled-components';

const CoordinatorMainImgs = styled.div`
    position:relative;
`;

const Heart = styled.img`
    position: absolute;
    z-index: 2;
    top: 20px;
    right: 16px;
`

const Img = styled.img`
    position:relative;
    z-index:-9;
    width: 100%;
    height: 46.44vh;
    border-radius: 18px;
    object-fit: cover; /* 이미지를 커버 모드로 설정 */
`;
const CoordinatorMainImg = (props) => {
    return(
        <CoordinatorMainImgs>
            <Img src={props.boardImg}/>
            <Heart src={props.fillColor} onClick={props.likeIncrease}></Heart>
        </CoordinatorMainImgs>
    )
}
export default CoordinatorMainImg;