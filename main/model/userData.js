import mongoose from "mongoose";
import { createHmac, randomBytes } from 'crypto';
import { jwtAuthFunc as jwtAuthFuncVar } from '../service/jwtAuth.js';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    }
});

userSchema.pre("save", function (next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
    next();
});

userSchema.static('matchPasswordAndCreateToken', async function( email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found!');
    // console.log(user);
    const salt = user.salt;
    const  hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect password!');
    const token = jwtAuthFuncVar.createToken(user);
    return token;
});

export const userModel = mongoose.model("userCollections", userSchema);