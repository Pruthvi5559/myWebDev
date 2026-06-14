const sessionIdToUserMap = new Map();
const secret = process.env.JWT_SECRET;
// export function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }
export function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },secret);
}

// export function getUser(id){
//     return sessionIdToUserMap.get(id);
// }     
export function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return redirect("/");
    }
}      