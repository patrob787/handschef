import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home"
import Header from "./Header"
import CheckPage from "./CheckPage"
import PaymentPage from "./PaymentPage";
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
          <Route path="/payment/check/:id" element={<PaymentPage />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </MyProvider>
    </div>
)}

export default App;
