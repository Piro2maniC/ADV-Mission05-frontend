import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutLanding from "./common/Layout-Landing/LayoutLanding.jsx";
import Landing from "./components/pages/landing/landing.jsx";
import Search from "./components/pages/search/search.jsx";
import Compare from "./components/pages/compare/compare.jsx";
import Listing from "./components/pages/listing/listing.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search/:keyword" element={<Search keyword={true} />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/listing/:id" element={<Listing id={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
