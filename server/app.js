const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");

const app = express();
app.use(express.json());


app.use(helmet());


app.use("/api/auth",authRoutes);
app.use("/api/listings",listingRoutes);




app.use(
    cors({
        origin:"*",
        credentials:true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});


app.use("/api",limiter);

app.get("/api/health",(req,res)=>{
    res.json({
        succes:true,
        message:"wanderhub api is runnig"
    })
});

module.exports = app;
