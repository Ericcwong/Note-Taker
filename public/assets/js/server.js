//Calls npm package
const express = require("express");

//assigns app to the express function, function tells node that we are creating an "Express" server.
const app = express();

//Creates the port where the local server is hosted.
//it would listen to whatever "process.env.PORT" is and if nothing is found, it would jumpt to 8000
let PORT = process.env.PORT || 8000

app.get("/*", function (req, res){
    res.sendFile(path.join(__dirname,"index.html"))
});
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname,"notes.html"))
});


app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});

