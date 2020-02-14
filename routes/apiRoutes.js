const fs = require("fs");
const path = require("path");

 
module.exports = function(app){

    app.get("/api/notes", function(req, res){
        //calls db file which is db.json
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function (req, res) {
        //notes that has been entered into the dom is set to newNotes
        let newNotes = req.body;
        //reads db.json sets it as a utf-8
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
            //check for errors
            if(err) throw err;
            // parses data into object
            let db = JSON.parse(data);
            //pushes to the db array
            db.push(newNotes)
            //assigns each note that is entered an id number
            let id = 1;
            for(let i = 0; i < db.length; i++){
                db[i].id = id++
            }
            
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(db),(err) => {
                if(err) throw err;
                //This lets the server know that a note has been added and refreshes the page
                return res.status(200).send("Note Added");
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        let currentNote = req.params.id;
        //reads the current json file
        fs.readFile("./db/db.json", "utf-8", (err,data) => {
            if(err){
                console.log(err);
            }
            //assigns the current db and parses the data
            let oldDb = JSON.parse(data);
            //This is where the deleteing happens. updatedNotes variable is filtering the json file (array) if x id does not equal the rest, remove it from the array.
            let updateNotes = oldDb.filter(x => {
                return x.id != currentNote;
            });
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile("./db/db.json",JSON.stringify(updateNotes),(err) => {
                if(err) throw err;
                //This lets the server know that a note has been added and refreshes the page
                return res.status(200).send("Note Deleted");
            });
        });
    });





};