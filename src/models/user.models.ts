const mongooseModel = require('mongoose');
const Schema= require('mongoose').Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
   name:{
      type:String,
      required:true,
      lowercase:true,
      trim:true,
      index:true
   },
   email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
      trim:true,
      index:true
   },
   phoneNumber :{
      type:Number,
      unique:true,
      required:true,
   },
   password:{
      type:String,
      required:[true,"Password is required"],
   },
   refreshToken:{
      type:String,
   },
}, { timestamps: true });

userSchema.pre("save", async function(this:any,next:any){
   if(!this.isModified("password")) return next();

   this.password = await bcrypt.hash(this.password,10);
   next()
})

// for checking or comparing password at the time of logging in
userSchema.methods.isPasswordCorrect = async function(password:string){
   return await bcrypt.compare(password,this.password);
}

//Acess token is generated using jwt.sign() method with user data and secret key and expiry time as payload
userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
         _id:this._id,
         email:this.email,
         username:this.username,
         fullName:this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}
//Refresh token is generated using jwt.sign() method with user id and secret key and expiry time as payload
// Difference between access token and refresh token is that refresh token is used to 
// generate new access token when access token is expired and refresh token is used to authenticate user
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
      {
         _id:this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}
const CurrentUser = mongooseModel.model("User",userSchema);
module.exports.User =  CurrentUser