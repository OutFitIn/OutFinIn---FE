import React, {useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import heart from '../../assets/img/heart.svg';
import fillheart from '../../assets/img/fillheart.svg';

const CoordinatorMainImgs = styled.div`
    position:relative;
`;

const Heart = styled.img`
    position: absolute;
    top: 20px;
    right: 16px;
`

const Img = styled.img`
    position:relative;
    width: 100%;
    height: 46.44vh;
    border-radius: 18px;
`;
const CoordinatorMainImg2 = (props) => {
    const [fillColor, setFillColor] = useState(heart);
    const ChangeColor = () => {
        setFillColor(fillColor === heart ? fillheart : heart)
      }
    return(
        <CoordinatorMainImgs>
            <Img src={props.boardImg}/>
            <Heart src={fillColor} onClick={ChangeColor}></Heart>
        </CoordinatorMainImgs>
    )
}
export default CoordinatorMainImg2