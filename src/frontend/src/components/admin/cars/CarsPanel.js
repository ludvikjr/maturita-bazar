import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Loader from "../../Loader";
import Pages from "../../layout/Pages";

import "../../../resources/style/CarsPanel.css";

export default function CarsPanel() {
  const [cars, setCars] = useState(null);
  const [carLoading, setCarLoading] = useState(true);

  const page = useSelector((state) => state.cars.page);

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
          limit: 0,
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
    return (
      <tr
        className=" car-box"
        onClick={() => (window.location = `/cars/${car.car._id}`)}
      >
        <td>{car.car.name}</td>
        <td>{car.car.createdAt}</td>
        <td>{car.car.owner}</td>
        <td>{car.car.cost}</td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <th>Name</th>
          <th>Created at</th>
          <th>Owner</th>
          <th>Cost</th>
        </thead>
        <tbody>{carList}</tbody>
      </table>
      <Pages limit={20} cars={cars} page={page} filtered={false} />
    </div>
  );
}
