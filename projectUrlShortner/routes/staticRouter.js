import express from "express";
import URL from "../models/url.model.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home",{
        urls: allurls,
    });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res)=>{
    // if(!req.user) return res.redirect("/login");

    const allurls = await URL.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allurls,
    });
    // return res.render("home");
});

router.get("/signup", (req, res)=>{
    return req.render("signup");
});

router.get("/login", (req, res)=>{
    return req.render("login");
});

export default router;