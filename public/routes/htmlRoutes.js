//Dependencies NPM packages
const path = require("path");

module.exports = function(app){
    //Create links to the other webpages so that index.html and notes.html dont show up on the search bar. Instead * and notes will be present
    app.get("*", function (req, res){
        res.sendFile(path.join(__dirname,"../public-HTML/index.html"))
    });
    app.get("/notes", function (req, res){
        res.sendFile(path.join(__dirname,"../public-HTML/notes.html"))
    });

};