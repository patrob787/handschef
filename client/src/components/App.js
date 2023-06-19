import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home"
import Header from "./Header"
import Error from "./Error"
import MyProvider from "./MyProvider";
import Login from "./Login";

function App() {
  // Code goes here!
  return (
    <div>
      <MyProvider>
        <Nav />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<Error/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </MyProvider>
    </div>
)}

export default App;
