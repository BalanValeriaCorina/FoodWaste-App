import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./pages/User";
import Group from "./pages/Group";
import Food from "./pages/Food";
import Category from "./pages/Category";

export default function Layout() {
  return (
    <Router>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/food">
            <Food />
          </Route>
          <Route path="/groups">
            <Group />
          </Route>
          <Route path="/categories">
            <Category />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </Router>
  );
}
