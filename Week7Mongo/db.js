const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const user = new Schema({
    username : String,
    password : String,
});
const todo = new Schema({
    title : String,
    done : Boolean,
    UserId : ObjectId
});
//align the models to schema
const userModel = mongoose.model("users" , user);
const todoModel = mongoose.model("todos", todo);
//export the usermodels 
module.exports={
    userModel : userModel,
    todoModel : todoModel
};