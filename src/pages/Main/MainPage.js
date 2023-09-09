import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";

const MainText = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 9.12vh;
  margin-bottom: 1.65vh;
`;

const HashTag = styled.div`
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Main = () => {
  const [selectStyle, setSelectStyle] = useState('이지캐주얼');

  const changeStyle = (style) => {
    setSelectStyle(style);
  }

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <MainText>인기 아우터들의<br/>코디를 둘러보세요 👀</MainText>
          <HashTag>
            <BigStyleCategoryBox content={'#미니멀'} onClick={() => changeStyle('미니멀')} isSelected={selectStyle === '미니멀'} />
            <BigStyleCategoryBox content={'#이지캐주얼'} onClick={() => changeStyle('이지캐주얼')} isSelected={selectStyle === '이지캐주얼'} />
            <BigStyleCategoryBox content={'#스트릿'}/>
            <BigStyleCategoryBox content={'#봄 코디'}/>
            <BigStyleCategoryBox content={'+'}/>
          </HashTag>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
  );
};

export default Main;
