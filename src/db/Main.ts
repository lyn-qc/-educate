import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:String,
    job:String,
    sex:String,
    password:String,
    imgs:String
})

let UsersModel;

try{
    UsersModel = mongoose.models.users || mongoose.model('users', UsersSchema);
}catch(error){
    console.log('Error registering users model:',error)
}

const MessageSchema = new mongoose.Schema({
    local:String,
    city:String,
    address:String,
    code:String,
    nation:String,
    time:String,
    about:String,
    uid:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
})

let MessageModel;

try{
    MessageModel = mongoose.models.messages || mongoose.model('message', MessageSchema,'message')
}catch(error){
    console.log('Error registering message model:',error)
}

export {
    UsersModel,
    MessageModel
}