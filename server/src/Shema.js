const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userDetails = new mongoose.Schema({
    name:String,
    empid:String,
    email:{type:String,unique:true},
    password:String,
    cpassword:String,
    phoneno:Number,
    // email:{type:String,unique:true}
});


// userDetails.pre('save',async function(next){
//     try {
//         console.log("before");
//     } catch (error) {
//         next(error)
//     }
// })

// userDetails.post('save',async function(next){
//     try {
//         console.log("after");
//     } catch (error) {
//         next(error)
//     }
// })

mongoose.model("loosu",userDetails)
//collection mame, schema name
// module.exports =Model

// email:{
//     type:String,
//     required:true,
//     lowercase:true'
//     unique:true
// }