
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
            const dbColl = await dbase.db("wk8project").collection("userData").find().toArray().then((list) => {
                const loop = list.filter((x)=> { return x.email, x.password})
                return loop; 
            })
            // 
            // gets all documents in the collection
            const documents = dbColl.filter((emel) => {return emel});
            // gets all the passwords in the collection
            const passwords = documents.map((x) => {return x.password})
            // gets all the email that matches with the user input
            const emails = documents.find((x) => {return x.email === coll.email})
            // 
            

            if(emails) {
                const auth = await bcrypt.compare(coll.password, passwords)
                if(auth){
                    res.status(200).send("password matches")
                } {
                    res.status(400).send("not match found")
                }
                
                res.send(emails)
            } else {
                res.send("email not match")
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
            const sign = jwtSign(data, env);
            res.cookie("jwt", sign, {maxAge: 300 * 24 * 60 * 60})
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

function jwtSign(data, secret) {
    const sign = jwt.sign(data, secret, {expiresIn: 300 * 24 * 60 * 60});
    return sign;
}

module.exports = {
    login,
    register
}