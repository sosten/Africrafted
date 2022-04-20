import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },

    date: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model ("User", userSchema);
export default User;