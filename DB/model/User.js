import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:Number,
    age:Number,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'female'
    }
  
},
{
    timestamps:true
})
const userModel =  mongoose.model('User',userSchema)
export default userModel