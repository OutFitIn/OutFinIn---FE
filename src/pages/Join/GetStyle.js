import React,{ useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import ExplOfQues from "../../components/Join/ExplOfQues";
import GetStyleBox from "../../components/Join/GetStyleBox";

const GetStyle = () => {
    const navigate = useNavigate();
    const [selectedStyles, setSelectedStyles] = useState([]);
    const styleOptions = [
        '미니멀',
        '이지캐주얼',
        '비즈니스캐주얼',
        '아메카지',
        '스트릿',
        '시티보이',
        '원마일웨어',
        '스포티',
        '유니크',
        '레트로',
        '러블리',
        '올드머니룩',
        '바캉스룩',
        '힙합',
    ];

    const handleStyleClick = (style) => {
        // 이미 선택된 스타일이면 제거, 아니면 추가
        if (selectedStyles.includes(style)) {
          setSelectedStyles(selectedStyles.filter((selectedStyle) => selectedStyle !== style));
        } else {
          setSelectedStyles([...selectedStyles, style]);
        }
      }

    // 코디네이터 선호 스타일
    const sendStyles = () => {
        let mode = localStorage.getItem('mode') == 1? 'coordinator' : 'user';
        async function fetchData(){
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.post(`https://ofi-d5e2473eb437.herokuapp.com/${mode}/styles`,
                {
                    styles: selectedStyles
                });

                if(res.data === 'success') {
                    navigate("/joinsuccess");
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchData();
    }


    return (
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <f.Flex>
                            <ButtonNumbers content={1}/>
                            <ButtonNumbers content={2}/>
                            <ButtonNumbers content={3} isSelected={true}/>
                            <ButtonNumbers content={4}/>
                        </f.Flex>
                        <QuestionMode content={localStorage.getItem('mode') == 1?
                        '코디네이터님이 추구하는\n 스타일은 어떤 느낌일까요?' : '회원님이 코디 받고 싶은\n스타일을 골라주세요!'} marginBottom={'6px'}/> 
                        <ExplOfQues content={localStorage.getItem('mode') == 1?
                        '코디 하고 싶은 스타일을 다양하게\n등록할 수록 더 많은 도움을 줄 수있습니다':
                        '코디 받고 싶은 스타일을 다양하게 등록하면\n 아우터에게 쉽게 도움 받을 수 있습니다'}/>
                        {/*스타일 박스들*/}
                        <StyleBoxContainer>
                            {styleOptions.map((style, index) => (
                                // 스타일이 선택된 경우에만 isSelected를 true로 설정
                                <GetStyleBox key={index} content={style} isSelected={selectedStyles.includes(style)} onClick={() => handleStyleClick(style)} />
                            ))}
                        </StyleBoxContainer>
                    </f.ScreenJoin>
                </f.ScreenComponent>
                <ButtonContainer>
                    <ButtonBottom content={'다음'} type={'axios'} sendInfo={sendStyles}/>
                </ButtonContainer>
            </f.SubScreen>
        </f.Totalframe>
    )
}

const StyleBoxContainer = styled.div`
    margin: 0 auto;
`

const ButtonContainer=styled.div`
    margin-left: 18px;
`

export default GetStyle;