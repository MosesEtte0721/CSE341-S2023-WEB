const express = require("express");
const dbase = require("./db/mongoDB").mongoDb;
const {checkSchema} = require("express-validator")
const port = process.env.PORT || 8080;
const bycrpt = require("bcryptjs");
const { default: axios } = require("axios");
const session = require("express-session");
const cookieParser = require("cookie-parser")
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
// app.use(express.static("static"))
// app.use(express.static(path.join(__dirname, 'public')));
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

app.get("/login-page", (req, res) => {
  res.render("login")
});

app.get("/register",  (req, res) => {
  res.render("register")
})


app.post("/register", checkSchema(valid.schema), logReg.register);


app.post("/login", checkSchema(validate.schema), controller.login)
  

app.get("/logout", pro, (req, res) => {
  req.session.token = null;
  res.redirect("/login")
})

// Redirects the user to gitHub authorization page
app.get("/githubOauth", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`)
})

// 
app.get("/callback", (req, res) => {
  const {code} = req.query;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }

 const options = {headers:{accept: "application/json"}};

 axios.post("https://github.com/login/oauth/access_token",body, options)
 .then((resp) => {req.session.token = resp.data.access_token;

 res.redirect("/home")
}).catch(err => {res.status(500).json({message:err.message})})

    res.render(`success`);
  })
  
// })

// console.log(access_code, "", "access code is here");
app.get('/success', (req, res) => {
  const access_code = req.query.code
  console.log(access_code);

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_code
    }
  }).then((response) => {
    res.send(response);
  })
});

app.listen(port, (req, res) => {
  console.log(`listening to port: ${port}`); 
});
