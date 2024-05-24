const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { connectDb } = require("./src/config/db");
const router = require("./src/routes/index");
const passport = require("passport");
// const passportStrategy = require("./passport");
require('dotenv').config();
require('./passport');
const session = require('express-session')
const app = express();
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("./src/config");
const server = http.createServer(app);

// const corsOption = {
//     origin: "*",
//     methods: "GET,OPTIONS,POST,PUT,PATCH,DELETE",
//     credentials: true,
//   };




app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

app.use(session({
  secret: 'somethingsecretgoeshere',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/login/success',async (req, res) => {
  if (req.user) {
    console.log("req.user",req.user);
    // if(req.user){
      const token = await jwt.sign({ id: req.user._id }, TOKEN_SECRET);
      console.log("token Sign up", token);
      res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        user: req.user,
        token: token,
      });      
    // }else{
    //   res.status(500).json({message: "Check the credentials"})
    // }

  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get('/auth/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/auth/login/failed',
}));

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect(process.env.CLIENT_URL);
  });
});



app.use("/", router);

app.get("/", async (req, res) => {
  console.log("Hello World");
  res.send("The App is Running");
});

app.use("*", (req, res) => {
  console.log("No Route Found");
  res.send("No Route Found");
});

const PORT = process.env.ENV_PORT || 5001;

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
