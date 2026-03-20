import User from "../model/authModel.js";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken.js";

export const registerUser=async(req,res)=>{
try{
    console.log("hiiiii--------")
    //data coming from postman
    const{name,email,password,}=req.body;
    console.log("Data coming from postman",req.body);

    //validation for fields all fileds are required
    if(!name||!email||!password){
        return res.status(400).json({message:"All fileds are required"}) //400--> Bad Request means the client sent invalid or incomplete data.
                                                                        //Since required fields are missing, 400 is the right status code.
    }


    //checking for duplicate user
    const existingUser=await User.findOne({email});
    console.log("existing user",existingUser)
    if(existingUser){
       return res.status(409).json({message:"User already exist..!"}) //409 confilts like in bussiness logic or duplicates-->Duplicate user
        
    }
     
    //create new user
    const user=await User.create({
        name,
        email,
        password,
        
    })
    console.log("registered user",user)

    return res.status(201).json({message:"User registered successfully",user}) //201-->  new user created  successfully
}catch(err){
        console.log("error of server",err);
       return res.status(500).json({message:`Server error ${err}`})
}
};

export const loginUser=async(req,res)=>{
    try{

        console.log("hi........");
        //data from postman 
        const{email,password}=req.body;
        console.log("Data coming from postman",req.body);

        if(!email||!password){
            return res.status(400).json({message:"All fields are required"});

        }

        //find user
        const user=await User.findOne({email});
        if(!user){
           return res.status(404).json({message:"User not found"})
        }

        //compare password here because password is hashed-->db m details save hai yha pr jb login hoga to password check hoga kyuki hashedpassword save hua hai
    const isMatch = await bcrypt.compare(password, user.password); //password-plain password, user.password--hashed password-- why coz at the time of registeration we store plain password not hashed password
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"}) //401-->Unauthorized --authentication fail.
        }
             //jwt token
             const token=generateToken({
                payload:{id:user._id},
                secret:process.env.JWT_SECRET,
                expiresIn:process.env.JWT_EXPIRE
             })
        
          return  res.status(200).json({message:"Userlogin sucessfully", //200--> because user login successfully 
                user: {
      name:user.name
      },
      token,
            });
    }catch(err){
        console.log("Error from server",err);
        return res.status(500).json({message:`Server error ....${err}`})
    }
}