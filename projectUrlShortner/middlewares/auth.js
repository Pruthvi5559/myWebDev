import getUser from "../service/auth.js";

//clean authentication
export function checkForAuthentication(req, res, next){
    // const authorizationHeadervalue = req.headers['authorization'];
    const tokenCookie = req.cookies?.token;

    // if(!authorizationHeadervalue || !authorizationHeadervalue.startsWith("Bearer")){
    //     return next();
    // } 
    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next(); 
}

//basic clean authorization still more to be add
//restrict: admin, user. tells whose role is restricted 
//so we give array of roles bcz there maybe a route which should be accessed by both admin and users
export function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.redirect('/login');
        if(!req.includes(req.user.role)) return res.end("unAuthorized");
        return next();
    }
}

//here we are writing the same code for both the function so not clean so follow above function
// export async function restrictToLoginUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"]

//     if(!userUid) return res.redirect("/login");

//     const token = userUid.split('Bearer ')[1]; //"Bearer [some token]" at 1st index we have "some token"
//     const user = getUser(token);
    
//     // const user = getUser(userUid);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// export async function checkAuth(req, res, next){
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"]

//     // const user = getUser(userUid);
//     const token = userUid.split('Bearer ')[1]; //"Bearer [some token]" at 1st index we have "some token"
//     const user = getUser(token);

//     req.user = user;
//     next();
// }