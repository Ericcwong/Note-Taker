//Loads the data from the DB
let db = require("../db/db");

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        res.json(db);
    });

    

    app.post("/api/notes", function (req, res) {
        let newNotes = req.body;
        db.push(newNotes);
        res.json(newNotes);
    });
};
