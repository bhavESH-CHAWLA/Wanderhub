const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true,
                unique:true,
                lowercase:true,
                trim:true
                
            },

            passwordhash:{
                type:String,
                required:true
            },
            role:{
                type:String,
                enum:["guest","host","admin"],
                default:"guest"
            },

            avatar:{
                type:String,
                default:""
            },
            phone: {
            type: String,
            default: ""
            }

        },
        {
            timestamps:true
        }
);

module.exports = mongoose.model("User",userSchema);

