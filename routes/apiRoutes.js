const fs = require("fs");
//Loads the data from the DB
let dbFile = require("../db/db.json");
 
module.exports = function(app){

    app.get("/api/notes", function(req, res){
        //calls dbFile which is db.json
        res.json(dbFile);
        //This only works when user visits /api/notes or else nothing would be logged
    });

    app.post("/api/notes", function (req) {
        //notes that has been entered into the dom is set to newNotes
        let newNotes = req.body;
        //reads db.json sets it as a utf-8
        fs.readFile("./db/db.json", "utf-8", (err,data) => {
            if(err){
                console.log(err);
            }
            // parses data into object
            let db = JSON.parse(data);
            //pushes the data in the notes to the db array
            let id = 1;
            for(let i = 0; i < db.length; i++){
                db[i].id = i++
            }
            db.push(newNotes);
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile("./db/db.json",JSON.stringify(db),(err) => {
                if(err){
                    console.log(err);
                }
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        let currentNote = req.params.id;
        fs.readFile("./db/db.json", "utf-8", (err,data) => {
            if(err){
                console.log(err);
            }
            let olddb = JSON.parse(data);
            let updateNotes = olddb.filter(x => {
                return x.id != currentNote;
            });
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile("./db/db.json",JSON.stringify(updateNotes),(err) => {
                if(err){
                    console.log(err);
                }
            });
        });
    });





};