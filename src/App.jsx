import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutLanding from "./common/Layout-Landing/LayoutLanding.jsx";
import Landing from "./components/pages/Landing/landing";
import Search from "./components/pages/Search/search";
import Compare from "./components/pages/Compare/compare";
import Listing from "./components/pages/listing/listing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/compare" element={<Compare />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
