import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

import "../resources/style/FilterForm.css";

import { toggleFilters, setFilteredCars } from "../redux/carSlice";

/**
 * Search form in home page
 * @returns Search form
 */
export default function FilterForm() {
  const [name, setName] = useState("");
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(50000);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [costError, setCostError] = useState("");

  /**
   * Validates if the input from user is valid
   */
  const validate = () => {
    if (maxCost < minCost) {
      setCostError("Max cost must be bigger than min cost..");
      return false;
    } else if (maxCost < 0 || minCost < 0) {
      setCostError("Invalid amount");
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();

  /**
   * Submits the form and sets state for filtered cars
   */
  const handleSubmit = async () => {
    setCostError("");
    if (validate()) {
      try {
        const result = await axios({
          method: "post",
          url: "/api/cars/filtered",
          data: {
            name: name,
            minCost: minCost,
            maxCost: maxCost,
            model: model,
            brand: brand,
          },
        });
        console.log(result);

        dispatch(setFilteredCars(result.data.cars));
        dispatch(toggleFilters("ENABLE"));
      } catch (err) {}
    }
  };

  return (
    <div className="filter-form box">
      <div className="field">
        <label className="label">Name</label>
        <div className="controls">
          <input
            className="input"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Brand</label>
        <div className="controls">
          <input
            className="input"
            type="text"
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            value={brand}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Model</label>
        <div className="controls">
          <input
            className="input"
            type="text"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            value={model}
          />
        </div>
      </div>
      <div className="field columns">
        <div className="column">
          <label className="label">Min cost</label>
          <div className="controls">
            <input
              className="input"
              type="text"
              onChange={(e) => {
                setMinCost(e.target.value);
              }}
              value={minCost}
            />
          </div>
        </div>
        <div className="column">
          <label className="label">Max cost</label>
          <div className="controls">
            <input
              className="input"
              type="text"
              onChange={(e) => {
                setMaxCost(e.target.value);
              }}
              value={maxCost}
            />
          </div>
        </div>
      </div>
      <span className="has-text-danger">{costError}</span>
      <div className="field">
        <button
          onClick={handleSubmit}
          className="button has-background-navy-blue has-text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}
