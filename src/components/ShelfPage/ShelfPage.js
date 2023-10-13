import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  ImageList,
  ImageListItem,
  Slide,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./ShelfPage.css";

function ShelfPage() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editMode, setEditMode] = useState(0);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.shelf);
  console.log(store);

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, [dispatch]);

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = { description, imageUrl };
    dispatch({ type: "ADD_ITEM", payload: newItem });
    setDescription("");
    setImageUrl("");
  };

  const handleUpdateItem = (event, id) => {
    event.preventDefault();
    const updatedItem = { description, imageUrl, user_id };
    console.log("updated item", updatedItem);
    dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
    setEditMode(0);
    setDescription("");
    setImageUrl("");
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Shelf
      </Typography>
      <Typography paragraph>Add image</Typography>
      <form onSubmit={handleAddItem}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="description"
          label="Description"
          name="description"
          autoFocus
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="imageUrl"
          label="Full Image URL"
          id="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          size="small"
        />
        <br />
        <Tooltip title="Add Item" arrow>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </Tooltip>
      </form>
      <Typography paragraph></Typography>
      <List>
        {store.map((item, index) => (
          //  {editMode === item.id ? (
          //   <input value={item.description}/>
          //   <input value={item.image_url})} />
          //
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            key={item.id}
          >
            <ListItem>
              <ImageList variant="masonry" cols={1} gap={8}>
                <ImageListItem>
                  <img
                    src={item.image_url}
                    alt={item.description}
                    className="imageItem"
                  />
                </ImageListItem>
              </ImageList>
              {editMode === item.id ? (
                <form onSubmit={(e) => handleUpdateItem(e, item.id)}>
                  <TextField
                    label="Description"
                    defaultValue={item.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    label="Image URL"
                    defaultValue={item.image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button type="submit">Save</Button>
                  <Button onClick={() => setEditMode(0)}>Cancel</Button>
                </form>
              ) : (
                <>
                  <Typography>{item.description}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      dispatch({ type: "DELETE_ITEM", payload: item.id })
                    }
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => setEditMode(item.id)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          </Slide>
        ))}
      </List>
    </Container>
  );
}

export default ShelfPage;
