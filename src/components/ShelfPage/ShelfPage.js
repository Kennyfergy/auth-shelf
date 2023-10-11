import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ShelfPage() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((store) => store.shelf);

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = { description, imageUrl };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  // console.log(store);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <div>
        <p>Add new item</p>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            required
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            value={imageUrl}
            name="imageUrl"
            placeholder="Full Image URL"
            required
            onChange={(event) => setImageUrl(event.target.value)}
          />
          <button>SUBMIT</button>
        </form>
      </div>
      <p>All of the available items can be seen here.</p>
      <div>
        {store.map((item) => (
          <ul key={item.id}>
            <li>
              {item.description}

              <img src={item.image_url} />
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_ITEM", payload: item.id })
                }
              >
                {" "}
                Delete{" "}
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ShelfPage;
