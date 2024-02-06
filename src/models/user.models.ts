const mongooseModel = require('mongoose');
const Schema= require('mongoose').Schema;
const bcrypt = require('bcrypt');

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

export const User =  mongooseModel.model("User", userSchema);