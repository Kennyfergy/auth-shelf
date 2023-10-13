const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//
//
//

/**
 * Get all of the items on the shelf
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "item";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting items", err);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const { description, imageUrl } = req.body;
  console.log(req.body);
  const queryText =
    "INSERT INTO item (description, image_url, user_id) VALUES ($1, $2, $3)";
  const queryValues = [description, imageUrl, req.user.id];
  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("Error adding item:", error);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;

  pool
    .query("DELETE FROM item WHERE id = $1 AND user_id = $2", [itemId, userId])
    .then((result) => {
      if (result.rowCount > 0) {
        res.sendStatus(204); // No Content
      } else {
        res.status(403).send("Not Authorized");
      }
    })
    .catch((err) => {
      console.log("Error in deleting item", err);
      res.sendStatus(500);
    });
});

//
//
//
//
//
//
//

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
  const updatedItem = req.body;
  console.log(req.body);

  if (req.user.id === updatedItem.user_id) {
    const queryText = `UPDATE "item" SET "description" = $1, image_url = $2 WHERE id = $3`;
    pool
      .query(queryText, [
        updatedItem.description,
        updatedItem.image_url,
        updatedItem.id,
      ])
      .then(() => {
        res.sendStatus(200);
      })

      .catch((err) => {
        console.log("Error updating item", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
});

module.exports = router;
