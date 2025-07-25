import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequestLeave from "./pages/RequestLeave"; // Adjust if in components
import { Gemini } from "./components/components";
const App = () => (
  <div className="app">
    <Navbar />
    <Routes>
      <Route path="/request-leave" element={<RequestLeave />} />
      <Route path="/gemini" element={<Gemini />} />
    </Routes>
  </div>
);

export default App;
