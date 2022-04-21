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

userRoute.get('/all_users', (req, res) => {
    UserModel.find()
    .then(data => {
        res.json(data)
    })

    .catch(() => {
        res.status(404);
        res.json({message: "You carrently have no users"})
    })
})

userRoute.get('/user/:id', async(req, res) => {
    UserModel.findById(req.params.id)
    .then(data => {
        res.json(data)
    })

    .catch(err => {
        console.log(err)
        res.json({message:'user not found'})
    })
})


// UPDATE USER

userRoute.put('/edit_user/:id', (req, res)=>{
  const user = UserModel.findByIdAndUpdate(req.params.id)
    .then(data => {
      res.json(data)
  })
})

// USER SIGN IN

userRoute.post('/sign_in', async(req, res)=>{
    const user = await UserModel.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isAdmin: userRoute.isAdmin
                }

            );
            return;

        }
    }
})

export default userRoute;