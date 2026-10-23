const express = require("express");

const {register,login} = require("../controllers/authcontroller");

const validate = require("../middleware/validator");
const authorize = require("../middleware/authorize");
const authenicate = require("../middleware/authenicate");


const {registerSchema,loginSchema} = require("../validators/authValidators");



const router = express.Router();

router.get("/host-test",
    authenicate,
    authorize(host),
    (req,res)=>{
        res.json({
            success:true,
            message:"welcome",
            user:req.user

        });
    }
)

router.post("/register",
    validate(registerSchema),
    register);

router.post("/login",
    validate(loginSchema),
    login
)

module.exports = router;

