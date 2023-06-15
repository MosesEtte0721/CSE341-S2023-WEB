const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const database = async () => {
    const dbas = dbase;
    const dbCollection = await dbase.db("wk8project").collection("userData")
    return dbCollection;
  };

const jwtAuth = (req, res, next) => {
    try{
        const cookToken = req.session.token;
        const headers = req.headers["authorization"];
        const token = headers.splice('')[1];
        const authenticate = jwt.verify(token, env.process.GITHUB_CLIENT_ID, (error, fn) => {
            if(error) {
                return res.status(404).json({message: error.message})
            }
            req.fn = fn;
            
        });

    } catch(error) {

    }
}

const nativeAuth = (req, res, database, next) => {

    // loops through the collection of the database and returns the email and password from the database
    const dbColl = database.map((doc) => {
        // doc.username,
        doc.email,
        doc.password
    });

    // input from the user for login
    const newLog = {
        // username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try{
        // authenticate the user inputs and returns if there are matches
        const search = dbColl.map((docs) => {
            // docs.username === newLog.username;
            docs.email === newLog.email;
            docs.password === newLog.password;
        });
        // returns error message if the inputs do not match
        if(search == null || undefined) {
            throw new Error("Incorrect credentials")
        }else {
            delete dbColl.password;
            next();
        }
        } catch(error) {
            res.status(404).json({message: error.message})
        }


}


module.exports = {
    jwtAuth,
    nativeAuth
}