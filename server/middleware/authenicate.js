const jwt = require("jsonwebtoken");

const authenicate  = (req,res,next)=>{
    const authheader = req.headers.authorization;

    if(!authheader||!authheader.startsWith("Bearer")){
        return res.status(401).json({
            success:false,
            error:"Authenication failed"
        });
    }

    const token = authheader.split(" ")[1];


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch{
         return res.status(401).json({
            success: false,
            error: "Invalid or expired token"
        });
    }
};


const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    const isOwner =
      listing.owner.toString() === req.user.userId;

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this listing",
      });
    }

    await listing.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete listing",
    });
  }
};

module.exports = authenicate;
