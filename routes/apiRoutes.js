const fs = require("fs");
//Loads the data from the DB
let dbFile = require("../db/db.json");
 
module.exports = function(app){
    app.get("/api/notes", function(req, res){
        //calls dbFile which is db.json
        res.json(dbFile);
        // assigning readfile to getdata
        // const getData = fs.readFileSync("./db/db.json");
        // //parses the data from db.json to objects
        // const getNotes = JSON.parse(getData);
        // //console logs the objects
        // console.log(getNotes);
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
            db.push(newNotes);
            let id = 1;
            for(let i = 0; i < db.length; i++){
                db[i].id = id++
            }
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile("./db/db.json",JSON.stringify(db),(err) => {
                if(err){
                    console.log(err);
                }
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        let id = req.params.id;
        fs.readFile("./db/db.json", "utf-8", (err,data) => {
            if(err){
                console.log(err);
            }
            let db = JSON.parse(data);
            let updateNotes = db.filter(x => {
                return x.id != id;
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