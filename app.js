const express = require("express");
const request = require("request");

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.send("Hello from home");
});

app.get("/search", (req, res)=>{
    res.render("search");
});

app.get("/results", (req, res)=>{
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.get("*", (req, res)=>{
    res.send("Sorry, page not found.");
});


const port = 3000;
app.listen(port || process.env.PORT, function(){
    console.log("Server Started on localhost", port);
});