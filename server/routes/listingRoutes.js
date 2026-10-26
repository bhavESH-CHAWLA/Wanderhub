
const express = require("express");

const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get("/", getAllListings);

router.get("/:id", getListingById);

router.post(
  "/",
  authenticate,
  authorize("host", "admin"),
  createListing
);

router.put(
  "/:id",
  authenticate,
  authorize("host", "admin"),
  updateListing
);

router.delete(
  "/:id",
  authenticate,
  authorize("host", "admin"),
  deleteListing
);

module.exports = router;
