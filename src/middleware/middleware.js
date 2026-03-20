import jwt from 'jsonwebtoken';
 export const middleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;//Here req.headers contain all header that postman sent and 
                                                // req.header.authorization contain extct the value type
    console.log("Auth Header:",authHeader);

    //to check authheader starts with Bearer or not
    if(!authHeader||!authHeader.startsWith('Bearer')){
    return res.status(401).json({message:"No Token provided"}); //401--> Unauthorized authentication required.
    }
    const token=authHeader.split(' ')[1];//split--> split string into array and split by space
    console.log("TOKEN:",token)

    try{

        console.log("hello");
        console.log("Token----",token)
        console.log(process.env.JWT_SECRET,"helloooooooo");

        const decoded=await jwt.verify(token,process.env.JWT_SECRET)//token-- a string extracted from authorization , secret -key you pass when creted token
        console.log("DECODED:",decoded);

        req.user=decoded; //here decoded payload wereturn to req.user ,payload({id:user._id,iat:....,exp:...})--requesting the idof current loggedin user
        next();//yha se ab route execute hoga
    }catch(err){
        console.log("ERROR---",err);
        return res.status(500).json({message:"Server Error--",Error:err.name})
    }

}