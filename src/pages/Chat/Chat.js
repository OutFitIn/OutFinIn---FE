import React, { useState,useRef } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import * as f from "../../components/Common/CommonStyle";

const Chat = () => {

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
            채팅 레츠고
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
  );
};

export default Chat;
