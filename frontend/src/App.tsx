import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rodovias from "./pages/Rodovias";
import Pontes from "./pages/Pontes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rodovias" element={<Rodovias />} />
                <Route path="/pontes" element={<Pontes />} />
            </Routes>
        </Router>
    );
}

export default App;
