import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from 'components/Navbar/Navbar';
import Coin from 'components/Coin/Coin';
import Exchange from 'components/Exchange/Exchange';
import Finance from 'components/Finance/Finance';
import ScrollUp from 'components/ScrollUp/ScrollUp';


function App() {
  return (
    <Router>
      <>
        <Navbar />
        <ScrollUp showScroll={10} />
      </>
      <Switch>

        <Route path="/" exact component={Coin} />
        <Route path="/exchange" component={Exchange} />
        <Route path="/finance" exact component={Finance} />


      </Switch>
    </Router>

  )
}

export default App;
