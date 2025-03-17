import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./components/About.jsx";
import SignIn from "./Pages/Sign.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path="/" Component={Home} />
        <Route path="/about" Component={About}/>
        <Route path="/signin" Component={SignIn}/>

        


        


      </Routes>
    </Router>
  );
}

export default App;
