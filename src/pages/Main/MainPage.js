import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import SmallStyleCategoryBox from "../../components/Common/SmallStyleCategoryBox";

const Main = () => {
  const [selectStyle, setSelectStyle] = useState('이지캐주얼');

  const changeStyle = (style) => {
    setSelectStyle(style);
  }

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <BigStyleCategoryBox content={'#미니멀'} onClick={() => changeStyle('미니멀')} isSelected={selectStyle === '미니멀'} />
          <BigStyleCategoryBox content={'#이지캐주얼'} onClick={() => changeStyle('이지캐주얼')} isSelected={selectStyle === '이지캐주얼'} />
          <SmallStyleCategoryBox content={'#스트릿'} />
        </f.ScreenComponent>
        <Navigation />
      </f.SubScreen>
    </f.Totalframe>
  );
};

export default Main;
