import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ModeChoice from "./pages/ModeChoice";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<ModeChoice/>}/>
            <Route path="/main" element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
