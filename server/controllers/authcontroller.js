const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;

        const existinguser = await User.findOne({email});

        if(existinguser){
            return res.status(409).json({
                success:false,
                error:"user is already registered"
            });

        }

        const passwordhash = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            passwordhash
        });

        res.status(201).json({
            success:true,
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role

            }
        });

    }catch(error){
        next(error);
    }
};

const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or passsword"
            });
        }

            const ispassword = await bcrypt.compare(password,user.passwordhash);

              if (!ispassword) {
                return res.status(401).json({
                success: false,
                error: "Invalid email or password"
            });
            }


            const accesstoken = jwt.sign({
                userId:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"15m"

            }
        );

        res.json({
            success:true,
            data:{
                accesstoken,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
        
    }
    catch(error){
        next(error);

    }

}

module.exports = {
    register,login
};
