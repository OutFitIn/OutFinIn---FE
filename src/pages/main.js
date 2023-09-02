import React from "react";
import Navigation from "../components/Navigation/Navigation";
import * as frame from "../components/CSS/CommonStyle";

const Main = () => {
  return (
    <frame.totalframe>
      <frame.sub_screen>
        <frame.screen_component></frame.screen_component>
        <Navigation />
      </frame.sub_screen>
    </frame.totalframe>
  );
};

export default Main;
