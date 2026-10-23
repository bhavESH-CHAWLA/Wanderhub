const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    location:{
        type:String,
        required:true,

    },
    country:{
        type:String,
        default:""
    },
    image: {
      type: String,
      default: "",
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    },
    {timestamps:true}
);
module.exports = mongoose.model("Listing",ListingSchema);

