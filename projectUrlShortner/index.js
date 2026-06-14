import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./connectors/connect.js";
import urlRoute from "./routes/url.route.js";
import URL from "./models/url.model.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT;
connectToMongoDB(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'));

app.set("view engine", "ejs");
app.set("views", Path2D.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/test", async (req, res)=>{
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
});

app.use("/url", restrictTo(['NORMAL', "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);

app.get("/:shortId", async (req, res)=>{
    const shortId = req.params.shortId;
    await URL.findOneAndUpdate({
        shortId
    }, {
        $push:{
            visitHistory: {
                timestamp: Date.now()
            }
        },
    });
    res.redirect(entry.redirectURL);
});



app.listen(PORT, ()=>{console.log(`server started on ${PORT}`);});
