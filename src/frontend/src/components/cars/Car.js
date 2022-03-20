import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";

import "../../resources/style/Car.css";

import Loader from "../Loader";
import Async from "react-async";
import CarListItem from "./CarListItem";

/**
 * Car page
 * @returns Car page
 */
export default function Car() {
  const { id } = useParams();

  /**
   * Checks if user didn't expire
   * @returns username
   */
  const getUsername = () => {
    try {
      const username = localStorage.getItem("username");
      const expiry = localStorage.getItem("expiry");

      if (!username) {
        return null;
      }

      const now = new Date();
      if (now.getTime() > expiry) {
        localStorage.removeItem("username");
        return null;
      }
      return username;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Gets resources from the API
   * @returns resources
   */
  const getResources = async () => {
    try {
      const cars = await axios({
        method: "get",
        url: `/api/cars/${id}`,
      });
      console.log("cars loaded");
      const cats = await axios({
        method: "get",
        url: `/api/cats/`,
      });
      console.log("cats loaded");
      return { cats: cats.data.cats, car: cars.data.car };
    } catch (err) {
      console.log(err);
    }
  };

  const [name, setName] = useState("");
  const [power, setPower] = useState(0);
  const [manufactured, setManufactured] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [cost, setCost] = useState(0);
  const [consumption, setConsumption] = useState(0);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");

  const [nameError, setNameError] = useState("");
  const [powerError, setPowerError] = useState("");
  const [mileageError, setMileageError] = useState("");
  const [costError, setCostError] = useState("");
  const [consumptionError, setConsumptionError] = useState("");
  const [manufacturedError, setManufacturedError] = useState("");
  const [modelError, setModelError] = useState("");

  const [isEditing, setEditing] = useState(false);

  return (
    /**
     * useAsync hook used here for loading
     */
    <Async promiseFn={getResources} id={id}>
      {({ data, err, isPending }) => {
        if (isPending) return <Loader />;
        if (err) return <div>oops something went wrong</div>;
        if (!isPending) {
          /**
           * Data gotten from the request
           */
          const { car, cats } = data;

          /**
           * Deletes car
           */
          const handleDelete = async () => {
            try {
              const result = await axios({
                method: "delete",
                url: `/api/cars/${id}`,
                withCredentials: true,
              });
              console.log(result);
              window.location = "/";
            } catch (err) {
              console.log(err);
            }
          };

          /**
           * User input validation
           */
          let validation = true;
          const validate = () => {
            if (!document.getElementById("name").value) {
              setNameError("Field is required");
              validation = false;
            }

            if (!document.getElementById("model").value) {
              setModelError("Field is required");
              validation = false;
            }

            if (!document.getElementById("power").value) {
              setPowerError("Field is required");
              validation = false;
            } else if (isNaN(document.getElementById("power").value)) {
              setPowerError("Insert a number");
              validation = false;
            }

            if (!document.getElementById("consumption").value) {
              setConsumptionError("Field is required");
              validation = false;
            } else if (isNaN(document.getElementById("consumption").value)) {
              setConsumptionError("Insert a number");
              validation = false;
            }

            if (!document.getElementById("cost").value) {
              setCostError("Field is required");
              validation = false;
            } else if (isNaN(document.getElementById("cost").value)) {
              setCostError("Insert a number");
              validation = false;
            }

            if (!document.getElementById("mileage").value) {
              setMileageError("Field is required");
              validation = false;
            } else if (isNaN(document.getElementById("mileage").value)) {
              setMileageError("Insert a number");
              validation = false;
            }

            if (!document.getElementById("manufactured").value) {
              setManufacturedError("Field is required");
              validation = false;
            } else if (isNaN(document.getElementById("manufactured").value)) {
              setManufacturedError("Insert a number");
              validation = false;
            }
          };

          const handleSave = async () => {
            setConsumptionError("");
            setNameError("");
            setManufacturedError("");
            setMileageError("");
            setCostError("");
            setPowerError("");
            setModelError("");
            validate();
            if (validation) {
              try {
                const result = await axios({
                  method: "put",
                  url: `/api/cars/${id}`,
                  data: {
                    name: document.getElementById("name").value,
                    power: document.getElementById("power").value,
                    manufactured: document.getElementById("manufactured").value,
                    mileage: document.getElementById("mileage").value,
                    cost: document.getElementById("cost").value,
                    consumption: document.getElementById("consumption").value,
                    description: document.getElementById("description").value,
                    model: document.getElementById("model").value,
                    color: document.getElementById("color").value,
                    brand: document.getElementById("brand").value,
                    type: document.getElementById("type").value,
                    transmission: document.getElementById("transmission").value,
                    imagePath: car.imagePath,
                  },
                  withCredentials: true,
                });
                console.log(result);
                window.location = "/";
              } catch (err) {
                console.log(err);
              }
              setEditing(false);
            }
            validation = true;
          };

          const isOwner = () => {
            if (car.owner === getUsername()) {
              return true;
            }
            return false;
          };

          /**
           * Makes option list
           * @param {*} cats
           * @returns option list
           */
          const makeOptionList = (cats) => {
            const list = cats.map((item) => {
              const option = (
                <option value={item.name} key={nanoid()}>
                  {item.name}
                </option>
              );
              return option;
            });
            return list;
          };

          const colorList = makeOptionList(cats.colors);
          const brandsList = makeOptionList(cats.brands);
          const transmissionList = makeOptionList(cats.transmissions);
          const carTypeList = makeOptionList(cats.types);

          /**
           * Makes all car attributes into state
           */
          setName(car.name);
          setPower(car.power);
          setManufactured(car.manufactured);
          setMileage(car.mileage);
          setCost(car.cost);
          setConsumption(car.consumption);
          setDescription(car.description);
          setModel(car.model);

          /**
           * default view
           */
          const defaultTemplate = (
            <div>
              <div className="box">
                <CarListItem item={car.name} rowName="Name" />
                <CarListItem item={car.cost} rowName="Cost" />
                <CarListItem item={car.transmission} rowName="Transmission" />
                <CarListItem item={car.type} rowName="Type" />
                <CarListItem
                  item={
                    car.power + " kW (" + Math.round(car.power * 1.36) + " PS)"
                  }
                  rowName="Power"
                />
                <CarListItem
                  item={car.consumption + " l/100 km (combined)"}
                  rowName="Consumption"
                />
                <CarListItem item={car.mileage + " km"} rowName="Power" />
                <CarListItem item={car.brand} rowName="Brand" />
                <CarListItem item={car.model} rowName="Model" />
                <CarListItem item={car.color} rowName="Color" />
                <CarListItem item={car.manufactured} rowName="Manufactured" />

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Owner</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column has-text-right-desktop">
                    <Link to={`/profile/${car.owner}`}>{car.owner}</Link>
                  </div>
                </div>
              </div>

              <div className="description box">
                <h4>Description</h4>
                <p>
                  {car.description
                    ? car.description
                    : "No description set by the user.."}
                </p>
              </div>

              {isOwner() || localStorage.getItem("userType") === "admin" ? (
                <div>
                  <button
                    onClick={() => setEditing(true)}
                    id="edit"
                    className="button has-background-navy-blue has-text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    id="delete"
                    className="button has-text-navy-blue"
                  >
                    Delete Car
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );

          /**
           * View for editing
           */
          const editTemplate = (
            <div>
              <div className="box">
                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Name</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={name}
                      id="name"
                    />
                    <span className="has-text-danger">{nameError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Cost</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={cost}
                      id="cost"
                    />
                    <span className="has-text-danger">{costError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Transmission</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <div className="select">
                      <select id="transmission" defaultValue={car.transmission}>
                        {transmissionList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Type</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <div className="select">
                      <select id="type" defaultValue={car.type}>
                        {carTypeList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Power</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={power}
                      id="power"
                    />
                    <span className="has-text-danger">{powerError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Brand</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <div className="select">
                      <select id="brand" defaultValue={car.brand}>
                        {brandsList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Consumption</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={consumption}
                      id="consumption"
                    />
                    <span className="has-text-danger">{consumptionError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Model</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={model}
                      id="model"
                    />
                    <span className="has-text-danger">{modelError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Color</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <div className="select">
                      <select id="color" defaultValue={car.color}>
                        {colorList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Manufactured</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={manufactured}
                      id="manufactured"
                    />
                    <span className="has-text-danger">{manufacturedError}</span>
                  </div>
                </div>

                <div className="row columns">
                  <div className="column is-two-thirds-desktop">
                    <h6>Mileage</h6>
                  </div>
                  <div className="column is-one-third-desktop btm-column">
                    <input
                      type="text"
                      className="input"
                      defaultValue={mileage}
                      id="mileage"
                    />
                    <span className="has-text-danger">{mileageError}</span>
                  </div>
                </div>
              </div>

              <div className="description box">
                <h4>Description</h4>
                <textarea
                  className="textarea"
                  defaultValue={description}
                  id="description"
                />
              </div>

              <button
                onClick={handleSave}
                id="edit"
                className="button has-background-navy-blue has-text-white"
              >
                Save
              </button>
            </div>
          );
          return (
            <div className="car-container container">
              <div className="content">
                <div className="box">
                  <img id="car_img" alt="Car" src={car.imagePath} />
                </div>

                {isEditing ? editTemplate : defaultTemplate}
              </div>
            </div>
          );
        }
      }}
    </Async>
  );
}
