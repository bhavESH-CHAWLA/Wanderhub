const express  = require("express");
const {getalllistings,getlisting} = require("../controllers/listingcontroller");

const router = express.Router();


router.get("/",getalllistings);



router.get("/:id",getlisting)


module.exports = router;

