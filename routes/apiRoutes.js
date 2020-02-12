//Loads the data from the DB
let db = require("../db/db");

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        res.json(db);
    });

    app.get("/api/notes/:note", function(req, res){
        let chosen = req.params.note;
        console.log(chosen);

        for (var i = 0; i < db.length; i++) {
            if (chosen === db[i].routeName) {
              return res.json(db[i]);
            }
          }
        
          return res.json(false);
    });

    app.post("/api/notes", function (req, res) {
        let newNotes = req.body;
        db.push(newNotes);
        res.json(newNotes);
    });
};
