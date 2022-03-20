import React from "react";
import { Async } from "react-async";
import { useHistory } from "react-router-dom";
import "../../resources/style/CarComponent.css";

export default function CarComponent(props) {
  const car = props.car.car;

  const history = useHistory();

  const handleClick = () => {
    history.push(`/cars/${car._id}`);
  };

  async function getRateFromApi() {
    try {
      const rate = await fetch(
        "https://api.exchangerate.host/convert?from=EUR&to=CZK"
      );
      const json = await rate.json();
      return json.result;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div onClick={handleClick} className="box car-card columns">
      <div
        className="car-image has-text-centered column is-one-third-desktop"
        style={{
          backgroundImage: `url(${car.imagePath})`,
        }}
      ></div>
      <div className="car-desc column is-two-thirds-desktop">
        <div className="columns">
          <div className="column is-three-quarters desc">
            <h3 className="has-text-navy-blue ">{car.name}</h3>
            <h5 className="under-heading">
              {car.manufactured}, {car.mileage} km, {car.power} kW (
              {Math.round(car.power * 1.36)} PS)
            </h5>
            <ul>
              <li id="cathegory">
                <i className="fas fa-car has-text-grey"></i>
                {car.type}
              </li>
              <li id="transmission">
                <i className="fas fa-cog has-text-grey"></i>
                {car.transmission}
              </li>
              <li id="exterior-color">
                <i className="fas fa-tint has-text-grey"></i>
                {car.color}
              </li>
              <li id="consumption">
                <i className="fas fa-gas-pump has-text-grey"></i>
                {car.consumption}l/100km
              </li>
            </ul>
          </div>
          <div className="has-background-navy-blue column is-one-quarter desc price">
            <h4 className="has-text-white price-heading">Price: </h4>
            <h4 className="has-text-center has-text-white mikes">
              {car.cost.toLocaleString()}€
            </h4>
            <Async promiseFn={getRateFromApi}>
              {({ data, error, isLoading }) => {
                if (isLoading) return "bruh";
                if (error) return `Something went wrong: ${error.message}`;
                if (data)
                  return (
                    <h4 className="has-text-white has-text-center mikes">
                      {Math.round(data * car.cost).toLocaleString()} CZK
                    </h4>
                  );
              }}
            </Async>
          </div>
        </div>
      </div>
    </div>
  );
}
