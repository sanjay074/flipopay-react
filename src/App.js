import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PayoutForm from "./PayoutForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayoutForm/>} />
      </Routes>
    </Router>
  );
};

export default App;


