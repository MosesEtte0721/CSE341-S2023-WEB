const express = require("express");
const mongoDb = require("./db/mongoDB");
const envi = require("dotenv").config();
const port = process.env.PORT || 8080;
const test = require("./controller/test.js");
const path = require("path")
const bycrpt = require("bcryptjs");
const store = require("store");
const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const app = express();
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.json());
// app.use(express.static("static"))
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));




// console.log(storage.get("keg"));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

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

app.get("/login", (req, res) => {
  res.render("login")
  
});

app.get("/register", (req, res) => {
  res.render("register")
})


app.post("/register", async (req, res) => {
  
  try {
    // const {email, password, username} = req.body;
    const hashedPassword = await bycrpt.hash(req.body.password, 15);

    const user = {
      _id: Date.now().toString()
      , email: req.body.email
      , password: hashedPassword
      , username: req.body.username
    }
    
    keglog.push(user);
    store.set("keg", keglog);

  } catch (error) {
    res.status(500).send(error)
    res.redirect("register")
  }
  
  console.log(keglog);
  res.render("login")
});


app.post("/login", async (req, res) => {
  
  const username = keglog.find((user) => {
    user[0].username === req.body.username
  })
  
  if(username == null) {
    res.status(404).send("username does not exist")
  }

  try {
    const compare = await bcrypt.compare(req.body.password, keg.password);
    if(!compare) {
      res.status(400).send("Incorrect password")
    }

    if(compare && username != null) {
      delete keg.password;
      const access_code = jwt.sign(
        keg, 
        process.env.GITHUB_CLIENT_SECRET, 
        {expiresIn: 360 * 3000})

      res.render("home")

    }
  } catch(error) {
    res.status(500).send()
  }
  
})

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

 const options = {headers:{accept: "application/json"}}
 axios.post("https://github.com/login/oauth/access_token",body, options)
 .then((resp) => {req.session.token = resp.data.access_token
 res.redirect("/home")
}).catch(err => {res.status(500).json({message:err.message})})

  
  // axios({
  //   // method:"post",
  //   url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${access_token}}`,
    
  // }).then((response) => {
  //   // console.log("Inside the response");
  //   access_code = response.data.access_token;
  //   console.log(access_code);
    
 
    // res.send("happy coding")
    res.render(`success`);
  })
  
// })

// console.log(access_code, "", "access code is here");
app.get('/success', (req, res) => {

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
