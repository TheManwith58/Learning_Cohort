const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;

const user = new schema({
    UserID : ObjectId,
    username : String,
    password : String,
    courses : Array
});
const course = new schema({
    CourseId : ObjectId,
    title : String,
    price : Number, 
    cousrseAdmin : String,
    description : String,
    ImageURI : String,
})
const admin = new admin({
    adminId : ObjectId,
    username : String,
    password : String,

})
 
const userModel = mongoose.model("users", user);
const adminModel = mongoose.model("adnmins", admin );
const courseModel = mongoose.model("courses", course);

module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel
}