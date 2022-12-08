import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";

const userRouter = express.Router();

// ADMIN GET ALL USERS

userRouter.get(
  "/users",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// ADMIN EDIT USER

userRouter.get(
  "/users/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/user/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// ADMIN DELETE USER

userRouter.delete(
  "/users/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// CREATE USER / SIGN UP USER

userRouter.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const saltPasword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPasword);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: securePassword,
      isAdmin: req.body.isAdmin,
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

// USER SIGN IN

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalied email or password" });
  })
);

// UPDATE_USER_PROFILE

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      if (req.body.password) {
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
        token: generateToken(updateProfile),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
