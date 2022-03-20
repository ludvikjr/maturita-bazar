import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import About from "./components/About";
import CarPreview from "./components/cars/CarPreview";
import FilterForm from "./components/FilterForm";
import Signup from "./components/login/Signup";
import Signin from "./components/login/Signin";
import Profile from "./components/users/Profile";
import CarForm from "./components/cars/CarForm";
import Car from "./components/cars/Car";
import Loader from "./components/Loader";
import Pages from "./components/layout/Pages";
import AdminPanel from "./components/admin/AdminPanel";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import "./resources/style/App.css";
import { toggleFilters } from "./redux/carSlice";

function App() {
  const [cars, setCars] = useState([]);
  const [carLoading, setCarLoading] = useState(true);

  const filteredCars = useSelector((state) => state.cars.filteredCars);
  const filtered = useSelector((state) => state.cars.filtered);
  const page = useSelector((state) => state.cars.page);

  const dispatch = useDispatch();

  const getCars = async (page) => {
    try {
      setCarLoading(true);
      const result = await axios({
        method: "post",
        url: "/api/cars/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          page: page,
          limit: 5,
        },
      });
      console.log(result);
      setCars(result.data.cars);
      setCarLoading(false);
      console.log("cars loaded");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCars(page);
  }, [page]);

  if (carLoading) return <Loader />;

  const carList = cars?.map((car) => {
    return <CarPreview car={car} key={car.car._id} />;
  });

  const filteredCarList = filteredCars?.map((car) => {
    return <CarPreview car={car} key={car.car._id} />;
  });

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Fragment>
              <Hero />
              <div className="container">
                <div id="maincontent" className="columns">
                  <div
                    id="filter-form"
                    className="column is-one-quarter-widescreen is-one-third-desktop"
                  >
                    <FilterForm />
                  </div>
                  <div id="cars" className="column content">
                    {filtered ? (
                      <div className="filter-notice content columns">
                        <h5 className="column">
                          {filteredCars.length} search results
                        </h5>
                        <i
                          onClick={() => {
                            dispatch(toggleFilters("DISABLE"));
                          }}
                          className="column fas fa-times"
                        ></i>
                      </div>
                    ) : null}
                    {cars.length > 0 ? (
                      filtered ? (
                        filteredCarList
                      ) : (
                        carList
                      )
                    ) : (
                      <div>No cars to display..</div>
                    )}
                    <Pages
                      filtered={filtered}
                      page={page}
                      cars={cars}
                      limit={5}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          </Route>
          <Route path="/about" component={About} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/sell" component={CarForm} />
          <Route path="/admin/" render={() => <AdminPanel />} />
          <Route path="/cars/:id" render={(props) => <Car {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
