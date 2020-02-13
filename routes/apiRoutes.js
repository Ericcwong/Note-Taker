const fs = require("fs");
const path = require("path");

 
module.exports = function(app){

    app.get("/api/notes", function(req, res){
        //calls dbFile which is db.json
        res.sendFile(path.join(__dirname, "../db/db.json"));
        //This only works when user visits /api/notes or else nothing would be logged
    });

    app.post("/api/notes", function (req, res) {
        //notes that has been entered into the dom is set to newNotes
        let newNotes = req.body;
        //reads db.json sets it as a utf-8
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
            if(err) throw err;
            // parses data into object
            let db = JSON.parse(data);
            db.push(newNotes)
            //pushes the data in the notes to the db array
            let id = 1;
            for(let i = 0; i < db.length; i++){
                db[i].id = id++
            }
            
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(db),(err) => {
                if(err) throw err;
                return res.status(200).send("Note Added");
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        let currentNote = req.params.id;
        fs.readFile("./db/db.json", "utf-8", (err,data) => {
            if(err){
                console.log(err);
            }
            let oldDb = JSON.parse(data);
            let updateNotes = oldDb.filter(x => {
                return x.id != currentNote;
            });
            //this is where it takes what is in db.json and writes whatever is entered into the database. Then stringifing it to work with the dom
            fs.writeFile("./db/db.json",JSON.stringify(updateNotes),(err) => {
                if(err) throw err;
                return res.status(200).send("Note Deleted");
            });
        });
    });





};