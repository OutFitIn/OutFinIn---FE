import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  { ModeChoice, UserInfo } from "./pages/Join";
import  MainPage from "./pages/Main/MainPage";
import CoInfoGetProfile from "./pages/Join/CoInfoGetProfile";
import GetStyle from "./pages/Join/GetStyle";

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<ModeChoice/>}/>
            <Route path="/userinfo" element={<UserInfo/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/coinfogetprofile" element={<CoInfoGetProfile/>}/>
            <Route path="/getstyle" element={<GetStyle/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
