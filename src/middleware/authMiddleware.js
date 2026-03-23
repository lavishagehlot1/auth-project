import{body,validationResult}from "express-validator"

export const registerValidator=()=>{
    return[
        body('name').notEmpty().withMessage("Name is required")
        .bail()
        
        .isString().withMessage("User name must be string")
        .bail()
        .trim()
        .isLength({min:3,max:15}).withMessage("User name must be 3 to 15 charcters"),

        body('email').notEmpty().withMessage("email  is required")
        .bail()
        .isEmail().withMessage("Invalid email")
        .bail()
        .normalizeEmail(),

        body('password').notEmpty().withMessage("password is required")
        .bail()
        .isLength({min:8}).withMessage("Password must be  of 8 charactrs")
        .bail()
        .isStrongPassword()
         .withMessage("Password must contain uppercase, lowercase, number and symbol")
        
    ]
}


export const loginValidator=()=>{
    return[
        body('email').notEmpty().withMessage("email  is required")
        .bail()
        .isEmail().withMessage("Invalid email")
        .bail()
        .normalizeEmail(),

        body('password').notEmpty().withMessage("password is required")
        .bail()
        .isLength({min:8}).withMessage("Password must be  of 8 charactrs")
       .bail()
        
    ]
}

//Middleware to check error
export const authValidations=(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    next();//back to routes


}