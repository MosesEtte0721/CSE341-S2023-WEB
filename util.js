const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const database = async () => {
    const dbas = dbase;
    const dbCollection = await dbase.db("wk8project").collection("userData")
    return dbCollection;
  };

const jwtAuth = async (req, res, next) => {
    
    const token =  req.cookies.jwt;
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.GITHUB_CLIENT_SECRET, (err, user) => {
  
      if (err) return res.status(403).redirect("/login")
  
      req.user = user
  
      next()
    });
 
       
        
    } 



const logout = (res, req, next) => {
    req.cookie("jwt", "", { maxAge: "1" }).redirect("/login-page");
    // const  jwToken = req.cookies.jwt;
   
    
    
}



module.exports = {
    jwtAuth,
    logout
}