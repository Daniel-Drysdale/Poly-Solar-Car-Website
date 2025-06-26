import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataDisplay from "./components/DataDisplay";
import ChartData from "./components/ChartData";
import Map from "./components/Map";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data/" element={<DataDisplay />} />
        <Route path="/charts/" element={<ChartData />} />
        <Route path="/map/" element={<Map />} />
      </Routes>
    </Router>
  );
};

export default App;
