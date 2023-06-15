import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home"
import Header from "./Header"
import Error from "./Error"

function App() {
  // Code goes here!
  return (
    <div>
      <h1>Welcome to HandsChef!</h1>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
)}

export default App;
