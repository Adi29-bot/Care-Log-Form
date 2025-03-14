import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import DailyLogForm from "./components/dailylog";
import ABC from "./components/ABC";
import BodyMap from "./components/bodymap";
import MAR from "./components/mar";
import ActivityEvidence from "./components/activity-evidence";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/Care-Log-Form' element={<DailyLogForm />} />
        <Route path='/Care-Log-Form/abc-chart' element={<ABC />} />
        {/* <Route path="/Care-Log-Form/incident-form" element={<IncidentForm />} /> */}
        <Route path='/Care-Log-Form/body-maps' element={<BodyMap />} />
        {/* <Route path="/Care-Log-Form/brs" element={<BRS />} /> */}
        <Route path='/Care-Log-Form/mar' element={<MAR />} />
        <Route path='/Care-Log-Form/activity-evidence' element={<ActivityEvidence />} />
      </Routes>
    </Router>
  );
}

export default App;
