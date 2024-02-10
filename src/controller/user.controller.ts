const {User} = require("../models/user.models");
const {ApiResponse} = require("../utilis/ApiResponse.ts");

const generateAccessAndRefreshTokens = async (userId:string) =>{
    try{
       const  user = await User.findById(userId);
       const accessToken = user.generateAccessToken();
       const refreshToken = user.generateRefreshToken();
 
       user.refreshToken = refreshToken;
       await user.save({validateBeforeSave:false});
 
       return {accessToken, refreshToken}
 
    } catch(e){
       return ({
        'status':'500',
        'Error':'Error while generating tokens'
       })
    }
 }

 const cookieResOptions = {
    httpOnly:true,
    // secure:true
 }

const registerUser = (async(req:any, res:any, next:any) => {

   const {name, email, phoneNumber, password} = req.body

   if(!name || !email || !phoneNumber || !password){
       return res.json({Error:`Api error 400, Required fields cannot be empty`})
   }
 
   try {
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
   } catch (error) {
    console.log("Error",error); 
    return res.json({Error:"Error"})
   }
 });

 const loginUser = (async(req:any, res:any, next:any) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.json({Error:`Api error 400, Required fields cannot be empty`})
    }
    try {
        const user = await User
        .findOne({email})
        .select("+password")
        .exec();
        if(!user){
            return res.json({Error:"User not found"})
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.json({Error:"Invalid password"})
        }
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res
        .status(200)
        .cookie("accessToken", accessToken, cookieResOptions)
        .cookie("refreshToken", refreshToken, cookieResOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user:loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
    } catch (error) {
        console.log("Error",error); 
        return res.json({Error:"Error"})
    }  
 })

 const logoutUser = (async(req:any, res:any, next:any) => {
    await User.findByIdAndUpdate(req.user._id, 
    {
        $set: {
            refreshToken: ""
        },
    },
    {
        new: true,
        runValidators: true,
    });

    return res
    .status(200)
    .clearCookie("accessToken", cookieResOptions)
    .clearCookie("refreshToken", cookieResOptions)
    .json(
        new ApiResponse(
           200, 
           {},
           "Logged out successfully"
        )
     )
})
 export {registerUser, loginUser, logoutUser}