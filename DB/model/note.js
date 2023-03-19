import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{ type:String,
    required:true},
    desc:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})
const noteModel = mongoose.model('Note',noteSchema)
export default noteModel