import express  from "express";
import bcrypt from "bcrypt";
// import UserModel from "../models/UserModel.js";
import User from "../models/UserModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

// CREATE USER
userRouter.post('/users', async(req, res)=>{
    const saltPasword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPasword)

    const newUser = new User({
        firstName: await req.body.firstName,
        lastName: await req.body.lastName,
        email: await req.body.email,
        password: securePassword,
        isAdmin: await req.body.isAdmin
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
});

// GET ALL USERS
userRouter.get('/all_users', (req, res) => {
    User.find()
    .then(data => {
        res.json(data)
    })

    .catch(() => {
        res.status(404);
        res.json({message: "You carrently have no users"})
    })
})

// GET SINGLE USER
userRouter.get('/user/:id', async(req, res) => {
    User.findById(req.params.id)
    .then(data => {
        res.json(data)
    })

    .catch(err => {
        console.log(err)
        res.json({message:'user not found'})
    })
})


// UPDATE USER
userRouter.put('/edit_user/:id', (req, res)=>{
  const user = User.findByIdAndUpdate(req.params.id)

    .then(data => {
      res.json(data)
  })
})

// USER SIGN IN
userRouter.post('/signin', async(req, res)=>{
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
})

export default userRouter;