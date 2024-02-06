const User = require("../models/user.models.ts");
const ApiResponse = require("../utilis/ApiResponse.ts");

const registerUser = (async(req:any, res:any, next:any) => {

   const {name, email, phoneNumber, password} = req.body
    console.log("req.body",req.body);

   if(!name || !email || !phoneNumber || !password){
       return res.json({Error:`Api error 400, Required fields cannot be empty`})
   }
 
   const isUserAvailabe = await User.findOne({
       $or: [
           { phoneNumber },
           { email}
       ]
   })
 
    if(isUserAvailabe){
        return res.json({Error:"User already exists with this username or email"})
    }
 
    const user = await User.create({
       name,
       email,
       phoneNumber,
       password
    })
 
    const userCreated = await User.findById(user._id).select(
       "-password -refreshToken"
    )
    if(!userCreated){
       return res.json({Error:"Error while creating user"})
    }
 
    return res.status(201).json(
       new ApiResponse(200, userCreated, "User created successfully")
    )
 });

 export {registerUser}