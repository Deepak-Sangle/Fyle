const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
var cors = require('cors')
require("dotenv").config();

//Middleware
// app.use(customMiddleware);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//Route Requests
app.use(require('./routes/auth'));

app.use((req,res,next)=>{
    res.send("404 Page");
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

//App Listening on port
app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
    
});