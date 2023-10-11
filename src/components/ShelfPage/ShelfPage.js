import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.shelf);

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);

  console.log(store);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <div>
        {store.map((item) => (
          <>
            <li>{item.description}</li>
            <li>
              <img src={item.image_url} />
            </li>
          </>
        ))}
      </div>
    </div>
  );
}

export default ShelfPage;
