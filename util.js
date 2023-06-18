const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const database = async () => {
    const dbas = dbase;
    const dbCollection = await dbase.db("wk8project").collection("userData")
    return dbCollection;
  };

const jwtAuth = (req, res, next) => {
 
        // retrieves  signed data from the cookie 
        const cookieToken = req.cookies.jwt;
        console.log("cookie", cookieToken)
        const  sessionToken = req.session.token;
        console.log("sessionToken", sessionToken);

        
        if(cookieToken) {
            const authenticate = jwt.verify(cookieToken, process.env.GITHUB_CLIENT_ID)
            if(authenticate) {
                res.send(cookieToken)
                next()
            } else {
                res.redirect("/login-page")
            }
            
                
        }
        
    } 



const logout = (res, req, next) => {
    const  jwToken = req.cookies.jwt;
    const  sessionToken = req.session.token;
    if(jwToken ) {
        res.clearCookie("jwt").redirect("/login");
    }
    
}



module.exports = {
    jwtAuth,
    logout
}