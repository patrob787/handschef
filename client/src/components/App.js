import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home"
import Header from "./Header"
import CheckPage from "./CheckPage"
import Error from "./Error"
import MyProvider from "./MyProvider";
import "./App.css"

function App() {
  // Code goes here!
  
  return (
    <div>
      <MyProvider>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/check/:id" element={<CheckPage />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </MyProvider>
    </div>
)}

export default App;
