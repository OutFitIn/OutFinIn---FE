import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ModeChoice, MainPage } from "./pages";
function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<ModeChoice/>}/>
            <Route path="/main" element={<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
