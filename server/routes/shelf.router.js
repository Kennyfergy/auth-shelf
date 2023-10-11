const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
//
//
//

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
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
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
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
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;

  pool
    .query("DELETE FROM shelf WHERE id = $1 AND user_id = $2", [itemId, userId])
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
