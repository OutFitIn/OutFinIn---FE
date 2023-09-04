import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  { ModeChoice, UserInfo } from "./pages/Join";
import  MainPage from "./pages/Main/MainPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<ModeChoice/>}/>
            <Route path="/userinfo" element={<UserInfo/>}/>
            <Route path="/main" element={<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
