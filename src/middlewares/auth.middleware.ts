const cookies = require("cookie-parser");
const middlewareJwt = require("jsonwebtoken");
const {User} = require("../models/user.models");

exports.middleware = ((req:Request, res:Response, next:any) => {
   return next;
});

exports.verifyUser = (async(req:any, res:any, next:any) => {
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
         return res.status(401).json({Error:"Unauthrorized access"});
      }
   
      const decodedToken = middlewareJwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      
      console.log("Middleware decodedToken",decodedToken);
      console.log("User", User);
      
      const currentUser = await User.findById(decodedToken?._id)
                  .select("-password -refreshToken")

      console.log("Middleware currentUser",currentUser);
      
      if(!currentUser){
         return res.status(401).json({Error:"Invalid access token"});
      }
   
      req.user = currentUser;
      next();
   } catch (error) {
      return res.status(401).json({'Error':"Error while verifying user"});
   }
});