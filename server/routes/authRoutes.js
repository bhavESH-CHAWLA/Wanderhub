const express = require("express");

const {register,login} = require("../controllers/authcontroller");

const validate = require("../middleware/validator");

const {registerSchema,loginSchema} = require("../validators/authValidators");



const router = express.Router();

router.post("/register",
    validate(registerSchema),
    register);

router.post("/login",
    validate(loginSchema),
    login
)

module.exports = router;

