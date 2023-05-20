require('dotenv').config();
const express=require('express');
// const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const path=require('path');
const hbs=require('hbs');
require('./db/conn');
const Register=require("./models/register")
const app=express();
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
console.log(process.env.SECRET_KEY);
// console.log(static_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/register",async (req,res)=>{
    try {
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const registerEmployee=new Register({
                firstname:req.body.firstname, 
                lastname:req.body.lastname, 
                email:req.body.email, 
                gender:req.body.gender, 
                phone:req.body.phone, 
                age:req.body.age, 
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            });

            const token=await registerEmployee.generateAuthToken();

            const registered= await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching!!!");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post("/login",async (req,res)=>{
    try {
        const email=req.body.email;
        // console.log(email);
        const password=req.body.password;
        // console.log(password);
        const userEmail=await Register.findOne({email:email});
        const isMatch=await bcrypt.compare(password,userEmail.password);
        console.log(isMatch);
        const token=await userEmail.generateAuthToken();
        console.log("token is:::"+token);
        // res.send(isMatch);
        if(isMatch){
            res.status(201).render("index");
        } else{
            res.status(400).send('Invalid login Details!!!')
        }
        // if(!userEmail){
        //     res.send("Email does not exist!!");
        // }
        // else{
        //     // if(password===userEmail.password){
        //     if(isMatch){
        //         res.render("index");
        //     }else{
        //         res.send("password is not matched!!!")
        //     }
        // }
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
});

// const createToken=async ()=>{
//     const token=await jwt.sign({_id:'64674b306752a9ce1e88c292'},"ahsgdvbcnmxkiyfdhnsjbcdhcjjcbdgc");
//     console.log(token);
//     const userVerification=await jwt.verify(token,"ahsgdvbcnmxkiyfdhnsjbcdhcjjcbdgc",{expiresIn:"2 seconds"});
//     console.log(userVerification);
// }
// createToken();
app.listen(port,()=>{
    console.log(`server running at prot no:${port}`);
});