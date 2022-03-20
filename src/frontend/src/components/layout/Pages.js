import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { setPage } from "../../redux/carSlice";

/**
 * Paging system
 * @param {*} props - props passed down from App.js
 * @returns Next page buttons
 */
export default function Pages(props) {
  const { filtered, cars, limit } = props;

  const page = useSelector((state) => state.cars.page);

  const dispatch = useDispatch();

  const [nextPageCars, setNextPageCars] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Gets next page so it can check if it's not empty
   */
  const getNextPage = async () => {
    try {
      const result = await axios({
        method: "post",
        url: "/api/cars/",
        data: {
          page: page + 1,
          limit: limit,
        },
      });
      setNextPageCars(result.data.cars);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNextPage();
  }, []);

  if (loading) return null;

  return (
    <div>
      {filtered ? null : page > 0 ? (
        <div className="container">
          <button
            onClick={() => dispatch(setPage(page - 1))}
            id="load"
            className="button has-background-navy-blue has-text-white"
          >
            Go back
          </button>
          {cars.length <= limit && nextPageCars.length === 0 ? null : (
            <button
              onClick={() => dispatch(setPage(page + 1))}
              id="load"
              className="button has-background-navy-blue has-text-white"
            >
              Load more
            </button>
          )}
        </div>
      ) : cars.length < limit && page === 0 ? null : (
        <div className="container">
          <button
            onClick={() => dispatch(setPage(page + 1))}
            id="load"
            className="button has-background-navy-blue has-text-white"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
