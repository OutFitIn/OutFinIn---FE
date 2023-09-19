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
const CoordinatorMainImg = (props) => {
    const [fillColor, setFillColor] = useState(heart);
    const SaveBtn = () => {
        setFillColor(fillColor === heart ? fillheart : heart);

         // 백엔드 통신
        // useEffect(()=>{
        //     async function fetchMainPage(){
        //     try{
        //         axios.defaults.withCredentials=true;
        //         const res = await axios.get("http://localhost:8080/user/like?userId="+1+"&boardId="+);
        //         setMainPage(res.data)
        //     }catch(error){
        //         console.error(error);
        //     }
        //     }
        //     fetchMainPage();
        // }, [])
      }
    return(
        <CoordinatorMainImgs>
            <Img src={props.boardImg}/>
            <Heart src={fillColor} onClick={SaveBtn}></Heart>
        </CoordinatorMainImgs>
    )
}
export default CoordinatorMainImg;