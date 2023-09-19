import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import  { ModeChoice, UserInfo, InputEmail} from "./pages/Join";
import { UserMainPage, OuterProfile, PostDetail } from "./pages/Main";
import CoInfo from "./pages/Join/CoInfo";
import GetStyle from "./pages/Join/GetStyle";
import JoinSuccess from "./pages/Join/JoinSuccess";
import Login from "./pages/Join/Login";
import OuterMainPage from "./pages/Main/OuterMainPage";
import WriteNewPost from "./pages/NewPost/WriteNewPost";
import Search from "./pages/Search/Search";
import SearchFilter from "./pages/Search/SearchFilter";
import Chat from "./pages/Chat/Chat";
import OuterMyPage from "./pages/MyPage/OuterMyPage";
import UserMyPage from "./pages/MyPage/UserMyPage";
import EditCoProfile from "./pages/MyPage/EditCoProfile";
import OuterRankInfo from "./pages/MyPage/OuterRankInfo";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
            <Route path="/inputemail" element={<InputEmail/>} />
            <Route path="/modechoice" element={<ModeChoice/>}/>
            <Route path="/userinfo" element={<UserInfo/>}/>
            <Route path="/usermainpage" element={<UserMainPage/>}/>
            <Route path="/outermainpage" element={<OuterMainPage/>}/>
            <Route path="/coinfo" element={<CoInfo/>}/>
            <Route path="/getstyle" element={<GetStyle/>}/>
            <Route path="/joinsuccess" element={<JoinSuccess />} />
            <Route path="/outerprofile" element={<OuterProfile />} />
            <Route path="/postdetail" element={<PostDetail />} />
            <Route path="/writenewpost" element={<WriteNewPost />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchfilter" element={<SearchFilter />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/outermypage" element={<OuterMyPage />} />
            <Route path="/usermypage" element={<UserMyPage />} />
            <Route path="/editcoprofile" element={<EditCoProfile />} />
            <Route path="/outerrankinfo" element={<OuterRankInfo/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
