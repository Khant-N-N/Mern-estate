import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="max-w-[2100px] mx-auto xll:text-[40px]">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
