import React, { useState,useRef } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import CoordinatorInfo from "../../components/MainPage/CoordinatorInfo";
import CoordinatorMainImg from "../../components/MainPage/CoordinatorMainImg";

const MainText = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 9.12vh;
  margin-bottom: 1.65vh;
`;



const CoordinatorProfile = styled.div`
  margin-top:3.08vh;
`;

const Search = () => {

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <input />
          <MainText>이런 스타일은 어떠신가요? 👀</MainText>
          {/* 코디네이터 프로필 */}
          <CoordinatorProfile>
            <Link to='/postdetail'>
              <CoordinatorMainImg/>
            </Link>
            <Link to='/outerprofile'>
              <CoordinatorInfo name={"웜톤 천재 아우터"}/>
            </Link>
          </CoordinatorProfile>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
  );
};

export default Search;
