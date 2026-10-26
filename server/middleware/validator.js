const { success } = require("zod");


const validate = (schema)=>{
    return (req,res,next)=>{
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success:false,
                error:result.error.issues.map(issue=>issue.message)
            });
        }

        req.body = result.data;

        next();


    }
}

module.exports = validate;

