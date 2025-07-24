import { Routes, Route } from "react-router-dom";
import RequestLeave from "./pages/RequestLeave"; // Adjust if in components

const App = () => (
  <Routes>
    <Route path="/request-leave" element={<RequestLeave />} />
  </Routes>
);

export default App;
