const express = require('express');
const mongoose =require('mongoose');
const schema = require('./Shema');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser =require('cookie-parser')
// const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {comparePassword,hashPassword} =require('./Password')
 const port = process.env.PORT || 5176;
const JWT_secret = "guhjvkjg^7*yh*9gf#$fhcmkjczvdf8sdfdiflaknvzkhgsgjhfsrt56isk(){{]]]bcfcxcyiy";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true,
}));
app.use(express.urlencoded({
    extended:false,
}));
// 
// const mongourl ="mongodb://localhost:27017/MERN"
// mongoose.connect(mongourl,{
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// }).then(()=>console.log("db connected"))
// .catch((e)=>{
//    console.log("db connection error:",e);
// })

mongoose.connect('mongodb://localhost:27017/paithiyam')
var db = mongoose.connection
db.on('error',()=>{console.log('error in connecting db')});
db.once('open',()=>{console.log('connected to db')});


const  Model = mongoose.model('loosu');
app.post("/register-user",async(req,res)=>{
    const {name, email, empid, password,cpassword, phoneno} = req.body;
    const encryptpassword = await hashPassword(password)
    try{
        // const olduser =User.findOne({email});
        // if(olduser){
        //   return res.json({error:"the email is already used"})
        // }
    const val= await Model.create({
        name, 
        email, 
        empid, 
        password:encryptpassword, 
        cpassword,  
        phoneno
    });
    res.send({status:'valuse are posted'})
    const doc = await val.save();
    console.log(doc);
    }catch(err){
        res.send({status:"error"})
    }
    console.log("values are posted")
});



app.post('/login-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body)
        const user = await Model.findOne({ email:email });

        // Check if user exists
        if (!user) {
            console.log("user is not found")
            res.json({status:"user is not found"})

        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (match) {
            // Generate JWT token
            jwt.sign({ email: user.email, id: user._id, name: user.name }, JWT_secret, {expiresIn: "15m"}, (err, token) => {
                if (err) {
                    console.log(err); // Log the error
                    res.json({status:"Token generation failed"})
                    return console.log('Token generation failed')
                }
                // Send the token in the response
                console.log(token)
                res.json({status:"ok",data:token})
                res.cookie("token", token).json({ user, token });
            });
        } else {
            // Password does not match
           console.log('Password does not match')
           res.json({status:'Password does not match'})
        }
    } catch (error) {
        console.log(error); // Log the error
        console.log('Internal Server Error')
        res.json({status:'Internal Server Error'})
    }
});


// app.post('/login-user', async(req, res) => {
//       const { email,password}  = req.body;
//       console.log(req.body)
//      const value =await Model.find({email:email});

// if(!value){
//    return res.json({error:"User Not Found"})}
//    const match =await comparePassword(password, Model.password,);
//     if(match){
//         const token = jwt.sign({email:value.email, id:value._id, name:value.name},JWT_secret);
//         if(res.status(201)){
//             console.log("checked")
//             return res.json({status:"ok",data:token})
//         }else{
//             return res.json({error:'error'})
//         }
//     }
// res.json({status:"error",error:"Invalid Passsword"})
        
//     });

app.post('/home',async(req,res)=>{
  const {token} =req.body
  try {
    const user = jwt.verify(token,JWT_secret,(err,res)=>{
        if(err){
            return "token expired"
        }
        return res;
    });
    console.log(user);
    if(user == "token expired" ){
        return res.send({status:"error",data:"token expired"})
    }
    const useremail =user.email;
    Model.findOne({email:useremail})
    .then((data)=>{
        res.send({status:"ok",data:data})
    })
    .catch((err)=>{
        res.send({status:"error",data:data})
    })
  } catch (error) {
    
  }
})


// app.get('/demo',async(req,res)=>{
//     res.set({
//         'Allow-acces-Allow-Origin':'*'
//     });
//     const doc =await Model.find({})
//     res.json(doc);
// });

app.listen(port,()=>{
    console.log(`server is running at port on ${port}`);
    // connect()
});