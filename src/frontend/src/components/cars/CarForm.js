import React, { useState } from "react";
import axios from "axios";
import { Async } from "react-async";
import Loader from "../Loader";

import "../../resources/style/CarForm.css";

import { nanoid } from "@reduxjs/toolkit";

const getCats = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `/api/cats/`,
    });
    console.log("cats loaded");
    return result.data.cats;
  } catch (err) {
    console.log(err);
  }
};

export default function CarForm() {
  const [name, setName] = useState("");
  const [power, setPower] = useState(0);
  const [manufactured, setManufactured] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [cost, setCost] = useState(0);
  const [consumption, setConsumption] = useState(0);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("BMW");
  const [transmission, setTransmission] = useState("6-Gear Manual");
  const [color, setColor] = useState("Green");
  const [type, setType] = useState("Coupe");

  const [nameError, setNameError] = useState("");
  const [powerError, setPowerError] = useState("");
  const [mileageError, setMileageError] = useState("");
  const [costError, setCostError] = useState("");
  const [consumptionError, setConsumptionError] = useState("");
  const [manufacturedError, setManufacturedError] = useState("");
  const [modelError, setModelError] = useState("");
  const [imageError, setImageError] = useState("");

  return (
    <Async promiseFn={getCats}>
      {({ data, err, isPending }) => {
        if (isPending) return <Loader />;
        if (err) return <div>Oops, something went wrong</div>;
        if (!isPending) {
          const cats = data;

          const makeOptionList = (listArray) => {
            const list = listArray.map((item) => {
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

          let validation = true;
          const validate = () => {
            if (image === null) {
              setImageError("Please upload an image");
            }

            if (!name) {
              setNameError("Field is required");
              validation = false;
            }

            if (!model) {
              setModelError("Field is required");
              validation = false;
            }

            if (!power) {
              setPowerError("Field is required");
              validation = false;
            } else if (isNaN(power)) {
              setPowerError("Insert a number");
              validation = false;
            }

            if (!consumption) {
              setConsumptionError("Field is required");
              validation = false;
            } else if (isNaN(consumption)) {
              setConsumptionError("Insert a number");
              validation = false;
            }

            if (!cost) {
              setCostError("Field is required");
              validation = false;
            } else if (isNaN(cost)) {
              setCostError("Insert a number");
              validation = false;
            }

            if (!mileage) {
              setMileageError("Field is required");
              validation = false;
            } else if (isNaN(mileage)) {
              setMileageError("Insert a number");
              validation = false;
            }

            if (!manufactured) {
              setManufacturedError("Field is required");
              validation = false;
            } else if (isNaN(manufactured)) {
              setManufacturedError("Insert a number");
              validation = false;
            }
          };

          const postCar = async (formData) => {
            try {
              const result = await axios({
                method: "post",
                url: "/api/cars/add",
                header: { "Content-type": "multipart/form-data" },
                data: formData,
                withCredentials: true,
              });
              console.log(result);
            } catch (err) {
              console.log(err);
            }
          };

          const handleSubmit = async () => {
            setConsumptionError("");
            setNameError("");
            setManufacturedError("");
            setMileageError("");
            setCostError("");
            setPowerError("");
            setModelError("");
            validate();
            if (validation) {
              console.log(brand);
              const formData = new FormData();
              formData.append("name", name);
              formData.append("manufactured", manufactured);
              formData.append("mileage", mileage);
              formData.append("power", power);
              formData.append("carType", type);
              formData.append("color", color);
              formData.append("brand", brand);
              formData.append("transmission", transmission);
              formData.append("cost", cost);
              formData.append("consumption", consumption);
              formData.append("description", description);
              formData.append("model", model);
              formData.append("carImage", image);

              await postCar(formData);
              //window.location = '/';
            }
          };

          return (
            <div id="form-container" className="box container">
              <div className="field columns">
                <div className="column">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      id="name"
                      name="name"
                      className="input"
                      type="text"
                      placeholder="Type a name for your car"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <span className="has-text-danger">{nameError}</span>
                  </div>
                </div>
                <div className="column">
                  <label className="label">Power (kW)</label>
                  <div className="control">
                    <input
                      id="power"
                      name="power"
                      className="input"
                      type="text"
                      placeholder="? kW"
                      onChange={(e) => {
                        setPower(e.target.value);
                      }}
                    />
                    <span className="has-text-danger">{powerError}</span>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column is-one-fourth">
                    <label className="label">Production year</label>
                    <div className="control has-icons-right">
                      <input
                        id="manufactured"
                        name="manufactured"
                        className="input"
                        type="text"
                        placeholder="YYYY"
                        onChange={(e) => {
                          setManufactured(e.target.value);
                        }}
                      />
                      <span className="has-text-danger">
                        {manufacturedError}
                      </span>
                    </div>
                  </div>

                  <div className="column is-one-fourth">
                    <label className="label">Mileage</label>
                    <div className="control has-icons-right">
                      <input
                        id="mileage"
                        name="mileage"
                        className="input"
                        type="text"
                        placeholder="Set your mileage"
                        onChange={(e) => {
                          setMileage(e.target.value);
                        }}
                      />
                      <span className="has-text-danger">{mileageError}</span>
                    </div>
                  </div>

                  <div className="column is-one-fourth">
                    <label className="label">Price</label>
                    <div className="control has-icons-right">
                      <input
                        id="cost"
                        name="cost"
                        className="input"
                        type="text"
                        placeholder="Set your price"
                        onChange={(e) => {
                          setCost(e.target.value);
                        }}
                      />
                      <span className="has-text-danger">{costError}</span>
                    </div>
                  </div>

                  <div className="column is-one-fourth">
                    <label className="label">Select type of your car</label>
                    <div className="select">
                      <select
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        name="type"
                        id="type"
                      >
                        {carTypeList}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column is-one-third">
                    <label className="label">Fuel consumption (Combined)</label>
                    <div className="control has-icons-right">
                      <input
                        id="consumption"
                        name="consumption"
                        className="input"
                        type="text"
                        placeholder="X l/100km"
                        onChange={(e) => {
                          setConsumption(e.target.value);
                        }}
                      />
                      <span className="has-text-danger">
                        {consumptionError}
                      </span>
                    </div>
                  </div>
                  <div className="column is-one-third">
                    <label className="label">Select color</label>
                    <div className="select">
                      <select
                        onChange={(e) => setColor(e.target.value)}
                        value={color}
                        id="color"
                      >
                        {colorList}
                      </select>
                    </div>
                  </div>
                  <div className="column is-one-third">
                    <label className="label">Select type of transmission</label>
                    <div className="select">
                      <select
                        onChange={(e) => setTransmission(e.target.value)}
                        value={transmission}
                        id="transmission"
                      >
                        {transmissionList}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column">
                    <label className="label">Select brand of your car</label>
                    <div className="select">
                      <select
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                        name="brand"
                        id="brand"
                      >
                        {brandsList}
                      </select>
                    </div>
                  </div>

                  <div className="column">
                    <div className="control">
                      <label className="label">Model</label>
                      <input
                        className="input"
                        name="model"
                        placeholder="Type your car's model name"
                        onChange={(e) => {
                          setModel(e.target.value);
                        }}
                      />
                      <span className="has-text-danger">{modelError}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <textarea
                  className="textarea"
                  id="desc"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>

              <div className="file">
                <label className="file-label">
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    className="file-input"
                    type="file"
                    name="img-input"
                    accept="image/*"
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Upload an image</span>
                  </span>
                </label>
              </div>
              <span className="has-text-danger">{imageError}</span>

              <div className="field is-grouped has-text-centered">
                <div className="control">
                  <button
                    onClick={handleSubmit}
                    id="submit"
                    className="button has-background-navy-blue has-text-white"
                  >
                    Add car
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }}
    </Async>
  );
}
