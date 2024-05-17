const express=require("express");
const http=require("http");
const bodyParser=require("body-parser");
const cors=require("cors");
const morgan=require("morgan");
const { connectDb } = require("./src/config/db");
const router = require("./src/routes/index");

const app=express()

const server=http.createServer(app);

// const corsOption = {
//     origin: "*",
//     methods: "GET,OPTIONS,POST,PUT,PATCH,DELETE",
//     credentials: true,
//   };
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("short"));


app.use("/", router);

app.get("/",async (req, res) =>{
    console.log("Hello World");
    res.send("The App is Running");
});


app.use("*",(req, res) =>{
    console.log("No Route Found");
    res.send("No Route Found")
});





const PORT = process.env.ENV_PORT || 5001;


connectDb().then(() =>{
    server.listen(PORT , () =>{
        console.log(`Server running on port ${PORT}`);
    });
})


