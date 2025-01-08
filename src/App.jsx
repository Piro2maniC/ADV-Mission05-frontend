import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutLanding from "./common/Layout-Landing/LayoutLanding.jsx";
import Landing from "./components/pages/landing/Landing.jsx";
import Search from "./components/pages/search/search.jsx";
import Compare from "./components/pages/compare/compare.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
