import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from 'components/Navbar/Navbar';
import Coin from 'components/Coin/Coin';
import Trending from 'components/Trending/Trending';

function App() {
  return (
    // <Router>
    //   <>
    //     <Navbar />
    //   </>
    //   <Switch>
    //     <Route path="/" exact component={Coin} />
    //     <Route path="/trending" component={Trending} />
    //   </Switch>
    // </Router>
    <Navbar />

  )
}

export default App;
