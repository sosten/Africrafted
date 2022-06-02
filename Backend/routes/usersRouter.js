import express  from "express";
import expressAsyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";
// import UserModel from "../models/UserModel.js";
import User from "../models/UserModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

// GET ALL USERS
userRouter.get('/users', async (req, res) => {
  const users = await User.find();
    res.send(users);
});

// CREATE USER
userRouter.post('/user', expressAsyncHandler(async(req, res)=>{
    const saltPasword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPasword)

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: securePassword,
        isAdmin: req.body.isAdmin
    });
    const user = await newUser.save();
    res.send(
        {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        }
    );

    //     .then(data => {
    //         res.json(data);
    //         console.log(data)
    //     })
    //     .catch(err => {
    //         res.json(err);
    //         console.log(err)
    // })
}));



// GET SINGLE USER
userRouter.get('/user/:id',expressAsyncHandler(async(req, res) => {
    User.findById(req.params.id)
    .then(data => {
        res.json(data)
    })

    .catch(err => {
        console.log(err)
        res.json({message:'user not found'})
    })
}))


// UPDATE USER
userRouter.put('/edit_user/:id', (req, res)=>{
  const user = User.findByIdAndUpdate(req.params.id)

    .then(data => {
      res.json(data)
  })
})

// USER SIGN IN
userRouter.post('/signin', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send(
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                }
            );
            return;
        }
    }
    res.status(401).send({message: "Invalied email or password"})
}));

// UPDATE _USER_PROFILE 

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 10) || user.password;
        }
    
        const updateProfile = await user.save();
        res.send({
            _id: updateProfile._id,
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            email: updateProfile.email,
            password: updateProfile.password,
            isAdmin: updateProfile.isAdmin,
            token: generateToken(updateProfile)
        });
    }else {
        res.status(404).send({message: 'User not found'});
    }
}));

export default userRouter;