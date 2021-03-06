//Calls npm package
const express = require("express");
const fs = require("fs");

//assigns app to the express function, function tells node that we are creating an "Express" server.
const app = express();
//Using readfileSync because it needs to read the file first before JSON.parsing the data

//Creates the port where the local server is hosted.
//it would listen to whatever "process.env.PORT" is and if nothing is found, it would jumpt to 8000
let PORT = process.env.PORT || 8000

//This is the middleware: is methods/functions/operations that are called between processing the request and sending response in the app
//In this case, it is for POST'ing or PUT'ing information into the server, but you would have to specify where with req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// });
// =======================================================
//ROUTER
// Calls in the other files that route where the API information is coming from and HTML
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =======================================================

//This listen to what the port is, as said before. The PORT can be either what heroku could spit out or set to 8000 if nothing is found.
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});

