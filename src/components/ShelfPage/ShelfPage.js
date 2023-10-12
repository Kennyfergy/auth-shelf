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
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./ShelfPage.css";

function ShelfPage() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((store) => store.shelf);

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
                    loading="lazy"
                    style={{
                      maxHeight: "200px",
                      maxWidth: "auto",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              </ImageList>
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
            </ListItem>
          </Slide>
        ))}
      </List>
    </Container>
  );
}

export default ShelfPage;
