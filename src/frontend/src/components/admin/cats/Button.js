import axios from "axios";
import React, { useState } from "react";

import "../../../resources/style/Button.css";

/**
 * Button for new cathegories
 * @param {*} props Props passed down by cathegories tab in admin panel
 * @returns New cathegory button
 */
export default function Button(props) {
  const [addingNew, setAddingNew] = useState(false);

  const [newItem, setNewItem] = useState("");
  const [submitError, setSubmitError] = useState("");

  const addNew = async () => {
    try {
      if (validate()) {
        const result = await axios({
          method: "post",
          url: `/api/cats/${props.name}`,
          data: {
            data: newItem,
          },
          withCredentials: true,
        });
        console.log(result);
        setAddingNew(false);
        window.location = "/admin/cats";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validate = () => {
    if (!newItem || newItem === "") {
      setSubmitError("Invalid input");
      return false;
    }
    return true;
  };

  return addingNew ? (
    <td>
      <input
        className="input new-item-input"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button
        className="button has-background-navy-blue has-text-white add"
        onClick={() => {
          addNew();
        }}
      >
        Add
      </button>
      <span className="has-text-danger error">{submitError}</span>
    </td>
  ) : (
    <td>
      <button
        className="button has-text-navy-blue"
        onClick={() => setAddingNew(true)}
      >
        Add new
      </button>
    </td>
  );
}
