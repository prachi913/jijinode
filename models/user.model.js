const mongoose = require("mongoose")



const userSchema= mongoose.Schema({
  
  email: { type: String, require: true },
  password: { type: String, require: true },
  confirm_password: { type: String, required: true },
});

const UserModel = mongoose.model("user", userSchema)


module.exports = {
    UserModel
}