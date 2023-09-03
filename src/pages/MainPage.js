import React from "react";
import Navigation from "../components/Navigation/Navigation";
import * as f from "../components/Common/CommonStyle";

const Main = () => {
  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent></f.ScreenComponent>
        <Navigation />
      </f.SubScreen>
    </f.Totalframe>
  );
};

export default Main;
