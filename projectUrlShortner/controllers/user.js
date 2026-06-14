import {v4 as uuidv4} from "uuid";
import User from "../models/user.model.js"
import { setUser, getUser } from "../service/auth.js";

export async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

export async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){
       return res.render("login", {
        error: 'wrong password or username'
       });
    }
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    // const token = setUser("uid", token);
    // return res.json({token});
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");

    return res.redirect("login");
}
