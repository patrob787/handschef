import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home"
import Header from "./Header"

function App() {
  // Code goes here!
  return (
    <div>
      <h1>Welcome to HandsChef!</h1>
      <Nav />
      <Header />
      <Home />
    </div>
)}

export default App;
