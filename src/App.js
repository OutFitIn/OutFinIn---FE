import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Modechoice from "./pages/mode_choice";
import Main from "./pages/main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Modechoice/>}/>
            <Route path="/main" element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
