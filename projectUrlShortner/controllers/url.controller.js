import shortid from "shortid";
import URL from "../models/url.model.js"

export async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id, 
    });
    return res.render("home", {
        id: shortID,
    });
    // return res.json({id:shortID});
}

export async function handleGetAnalytics(req, res){
    const shortId = req.param.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length, anaytics: result.visitHistory});
}
