import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Modechoice from "./pages/mode_choice";

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Modechoice/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
