const express = require("express");
const dbase = require("./db/mongoDB").mongoDb;
const {checkSchema} = require("express-validator")
const port = process.env.PORT || 8080;
const { default: axios } = require("axios");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const path = require("path")
const util = require("./util");
const controller = require("./controller/log-reg");
const valid = require("./validator");
const validate = require("./validation-login");
const logReg = require("./controller/log-reg")



const app = express();
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: {maxAge: 20000}
}))

app.use(cookieParser());

app.use(express.json());
// app.use(express.static("public"));

app.use("/public", express.static("public"));
// app.use('/public', express.static(path.join(__dirname + 'public/style.css')));
// app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



app.use("/", require("./routes"));

// app.get("/login", (req, res) => {
//   res.sendFile((__dirname, "/reg-form/login.html"))
// })
const pro = (req, res, next) =>{
  try{
      if(req.session.token) {
          next();
      
      }else{
          throw new Error("Please login to access this page")
      }
  }catch(error){
      res.status(500).json({message: error.message})
  }
}

// displays the login page
app.get("/login-page", (req, res) => {
  res.render("login")
});

// displays the registration or sign up page
app.get("/register",  (req, res) => {
  res.render("register")
})

// home page
app.get("/home",  (req, res) => {
  res.render("home")
})

// redirects to the profile page
// app.post("/profile", checkSchema(valid.schema), util.jwtAuth, logReg.  profile)

// Registration or sign up page
app.post("/register", checkSchema(valid.schema), logReg.register);

// Login page
app.post("/login", checkSchema(validate.schema), controller.login)
  
// Logout page
// app.get("/logout",  util.logout, (req, res) => {
//   req.session.token = null;
//   res.redirect("/login")
// })

// Redirects the user to gitHub authorization page
app.get("/githubOauth", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`)
})

// landing page after Oauth 
app.get("/callback", (req, res) => {
  const {code} = req.query;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }

 const options = {headers:{accept: "application/json"}};

 axios.post("https://github.com/login/oauth/access_token",body, options)
 .then((resp) => {req.session.token = resp.data.code;

 res.redirect("/home")
}).catch(err => {res.status(500).json({message:err.message})})

    res.redirect(`/success`);
  })
  
// })

// success page
app.get('/success', util.jwtAuth, (req, res) => {
 res.render("success")
});

app.listen(port, (req, res) => {
  console.log(`listening to port: ${port}`); 
});
