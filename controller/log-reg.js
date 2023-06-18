
const database = require("../db/mongoDB").mongoDb();
const jwt = require("jsonwebtoken");
const env = require("dotenv").config()
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator")

const login = async (req, res) => {

    const validation = validationResult(req);

    if(validation.errors.length > 0) {
        res.status(400).json({message: validation.errors});
        return;
    }
     
    const coll = {
                email: req.body.email,
                password: req.body.password
    }
     
        try {

            const dbase = await database;
            // loops through the collection in the database and returns  
            const dbColl = await dbase.db("wk8project").collection("userData").find().toArray().then((list) => {
                const loop = list.filter((x)=> { return x.email, x.password})
                return loop; 
            })
            // 
            // gets all documents in the collection
            const documents = dbColl.filter((emel) => {return emel});
           
            // compares and returns email that matches with the user input
            const userEmail = documents.find((x) => {return x.email === coll.email})
            

            if(userEmail) {
                // the user hashed password
                const hashedPassword = userEmail.password
                
                // compares new password to the hashed password in the database
                const auth = await bcrypt.compare(coll.password, hashedPassword)
                if(auth){
                    // deletes password after successfull comparison
                    delete hashedPassword
                    // signs with JWT 
                    const signJwt = jwt.sign(userEmail, process.env.GITHUB_CLIENT_SECRET, {expiresIn: 3000 * 24 * 60 * 60 * 30000})
                    // stores in the cookies
                    res.cookie("jwt", signJwt, {maxAge: 3000 * 24 * 60 * 60 * 30000, httpOnly: true})
                    // redirects to the home page
                    res.status(200).redirect("/home")
                    // return userEmail;
                } 
                else { 
                    res.status(400).redirect("/register")
                    throw Error("Invalid password. Please enter correct password")
                }
                
            } 
            else {
                res.status(404).redirect("/register")
                throw Error("Incorrect Email")
            }

        } catch(error) {
            res.status(500).json({message: error.message})
        }

}
   

    

//     try {
//         
        

//          {
//         if(dbColl) {
//             // const loop = dbColl.for(i in coll){
                
//             // }
//             // if(coll.email === dbColl.email){
//             //     console.log(dbColl)
//             //     res.send("password matches");
//             // }
//             // else{
//             //     res.status(404).send("FAILED! could not find match")
//             // }
            
//             res.status(200).json(callback);
//             res.render("welcome")
//         }
//         else{
//             res.status(404).send("NOT FOUND")
//             throw new Error("ERROR OCCURRED")
//         }
//     })
//    } catch(err) {
//         res.status(500).json({message: err.message})
//    }
// }


// validate data, hash password,signs with JWT, and insert data into the database
const register = async (req, res) => {
    // executes data validation
    let result = validationResult(req);

    // returns error message if the data does not match the requirement
    if(result.errors.length > 0){
      res.status(444).send(result.errors)
        return;
    }
    // uses bcryptjs to hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const data = {
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
    };
    const env = process.env.GITHUB_CLIENT_SECRET;

    // handles error
    try{
        // connects to the mongDb
        const dbase = await database;
        // inserts into the database and collection in mongoDb
        const dbCollection = await dbase.db("wk8project").collection("userData").insertOne(data);
        
        // checks if insertion was successfull
        if(dbCollection.acknowledged){
            // uses jsonwebtoken to sign the data inserted
            const sign = jwtSign(data, env, 300 * 24 * 60 * 60 * 30000 );
            res.cookie("jwt", sign, {maxAge: 300 * 24 * 60 * 60 * 30000});
            res.setHeader("Content-Type", "application/json")

            // return the status and redirect to login page
            res.status(201).redirect("/login-page");
            
        }
         else {
            // sends status code for unsuccessful insertion
            res.status(400).redirect("/register")
            throw new Error("Error occurred while creating new user")
            
        }
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

function jwtSign(data, secret, num) {
    const sign = jwt.sign(data, secret, num);
    return sign;
}

module.exports = {
    login,
    register
}