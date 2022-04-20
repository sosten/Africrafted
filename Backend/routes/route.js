import express  from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

const userRoute = express.Router();

userRoute.post('/user',async(req, res)=>{
    const saltPasword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPasword)
    
    const user = new UserModel({
        firstName: await req.body.firstName,
        lastName: await req.body.lastName,
        email: await req.body.email,
        password: securePassword
    })
    user.save()
    .then(data => {
        res.json(data);
        console.log(data)
    })
    .catch(err => {
        res.json(err);
        console.log(err)
    })
})

userRoute.get('/user/:id', (req, res) => {
    UserModel.findOne(user => user.id === req.params.id)
    .then(data => {
        res.json(data)
    })

    .catch(err => {
        console.log(err)
        res.json({message: 'user not found'})
    })
})

export default userRoute;