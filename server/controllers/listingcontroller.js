const Listing = require("../models/Listing");

const getalllistings = async(req,res)=>{
    try{
        const listings = await Listing.find().populate("owner","name email");
        res.status(200).json({
            success:true,
            count:listings.length,
            listings,

        });
    }catch(err){
        res.status(401).json({
            success:false,
            message:"Failed to fetch listings"
        });
    }

};

const getlisting = async(req,res)=>{
    try{
    const {id} = req.params;

    const listing = await Listing.findById(id).populate("owner","name email");
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch listing",
    });
}
}

    module.exports = {getalllistings,getlisting};
