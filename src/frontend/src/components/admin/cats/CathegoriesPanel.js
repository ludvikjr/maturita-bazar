import React, { useState, useEffect, useRef } from "react";
import Loader from "../../Loader";
import axios from "axios";
import Button from "./Button";

import "../../../resources/style/CathegoriesPanel.css";

/**
 * Cathegories tab in admin panel
 * @returns Cathegories tab
 */
export default function CathegoriesPanel() {
  const [cats, setCats] = useState(null);
  const [catsLoading, setCatsLoading] = useState(true);

  const [deletedCat, setDeletedCat] = useState("");
  const [deletedCatType, setDeletedCatType] = useState("");

  /**
   * useRef hook - used for reference in JSX
   */
  const modal = useRef(null);

  /**
   * Gets cathegories from the API
   */
  const getCats = async () => {
    try {
      const result = await axios({
        method: "get",
        url: `/api/cats/`,
      });
      console.log("cats loaded");
      setCats(result.data.cats);
      setCatsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Deletes cathegory
   * @param {*} id cathegory id
   * @param {*} type which cathegory it is
   */
  const deleteCat = async (id, type) => {
    try {
      const result = await axios({
        method: "delete",
        url: `/api/cats/${id}`,
        data: {
          catType: type,
        },
        withCredentials: true,
      });
      console.log(result);
      window.location = "/admin/cats";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  /**
   * If cathegories are not loaded, return Loader
   */
  if (catsLoading) return <Loader />;

  /**
   * Makes table column
   * @param {*} items cathegories array
   * @param {*} type cathegory type
   * @returns table column
   */
  const makeTableColumn = (items, type) => {
    return items.map((item) => {
      return (
        <tr
          className="table-item"
          onClick={() => {
            setDeletedCat(item._id);
            setDeletedCatType(type);
            openModal();
          }}
        >
          {item.name}
          <span className="has-text-danger delete-sign ">Delete</span>
        </tr>
      );
    });
  };

  /**
   * Opens modal
   */
  const openModal = () => {
    modal.current.classList.add("is-active");
  };

  /**
   * closes modal
   */
  const closeModal = () => {
    modal.current.classList.remove("is-active");
  };

  const brandsColumn = makeTableColumn(cats.brands, "brand");
  const colorsColumn = makeTableColumn(cats.colors, "color");
  const transmissionsColumn = makeTableColumn(
    cats.transmissions,
    "transmission"
  );
  const typesColumn = makeTableColumn(cats.types, "carType");

  return (
    <div>
      <div ref={modal} className="modal">
        <div className="modal-background"></div>

        <div className="modal-content has-text-centered">
          <div className="box content">
            <h5>Delete this cathegory?</h5>
            <div className="buttons">
              <button
                className="button has-text-navy-blue"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                className="button has-background-navy-blue has-text-white"
                onClick={() => deleteCat(deletedCat, deletedCatType)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <th>Brands</th>
            <th>Colors</th>
            <th>Car Types</th>
            <th>Transmissions</th>
          </thead>
          <tbody>
            <td className="cat-column">{brandsColumn}</td>
            <td className="cat-column">{colorsColumn}</td>
            <td className="cat-column">{typesColumn}</td>
            <td className="cat-column">{transmissionsColumn}</td>
            <tr>
              <Button name="brands" />
              <Button name="colors" />
              <Button name="cartypes" />
              <Button name="transmissions" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
