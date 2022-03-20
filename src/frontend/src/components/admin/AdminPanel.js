import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../resources/style/AdminPanel.css";

import CathegoriesPanel from "./cats/CathegoriesPanel";
import UserPanel from "./users/UserPanel";
import CarsPanel from "./cars/CarsPanel";

function AdminPanel() {
  return (
    <div className="container">
      <div className="tabs is-centered">
        <ul>
          <li className="list-item">
            <Link to="/admin/cats">Manage cathegories</Link>
          </li>

          <li className="list-item">
            <Link to="/admin/users">Manage users</Link>
          </li>
          <li className="list-item">
            <Link to="/admin/cars">Manage cars</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/admin/cats/" render={() => <CathegoriesPanel />} />
        <Route path="/admin/users/" render={() => <UserPanel />} />
        <Route path="/admin/cars/" render={() => <CarsPanel />} />
      </Switch>
    </div>
  );
}

export default AdminPanel;
