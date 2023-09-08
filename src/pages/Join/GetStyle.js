import React,{ useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import ExplOfQues from "../../components/Join/ExplOfQues";
import GetStyleBox from "../../components/Join/GetStyleBox";

const GetStyle = () => {
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

    
    return (
        <f.Totalframe>
            <f.SubScreen>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <f.Flex>
                            <ButtonNumbers content={1}/>
                            <ButtonNumbers content={2}/>
                            <ButtonNumbers content={3}/>
                            <ButtonNumbers content={4}/>
                        </f.Flex>
                        {/*여기 수정해주기!! 코디네이터냐 user냐에 따라 내용만 다르게 뜨게. 일단은 코디네이터 입장*/}
                        <QuestionMode content={'코디네이터님이 추구하는\n 스타일은 어떤 느낌일까요?'} marginBottom={'6px'}/> 
                        {/*여기 수정해주기!! 코디네이터냐 user냐에 따라 내용만 다르게 뜨게. 일단은 코디네이터 입장*/}
                        <ExplOfQues content={'코디 받고 싶은 스타일을 다양하게 등록하면\n 코디네이터에게 쉽게 도움 받을 수 있습니다'}/>
                        {/*스타일 박스들*/}
                        <StyleBoxContainer>
                            {styleOptions.map((style, index) => (
                                // 스타일이 선택된 경우에만 isSelected를 true로 설정
                                <GetStyleBox key={index} content={style} isSelected={selectedStyles.includes(style)} onClick={() => handleStyleClick(style)} />
                            ))}
                        </StyleBoxContainer>
                        
                        
                        {/*여기 수정!! 사용자인 경우에는 UserGetRecommend로 이동해야함. */}
                        <Link to="../joinsuccess" style={{ textDecoration: 'none' }}>
                            <ButtonBottom content={'다음'} />
                        </Link>
                    </f.ScreenJoin>
                </f.ScreenComponent>
            </f.SubScreen>
        </f.Totalframe>
    )
}

const StyleBoxContainer = styled.div`
    margin: 0 auto;
`

export default GetStyle;