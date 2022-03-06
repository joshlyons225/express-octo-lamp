const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// export app function
module.exports = app => {

    // pull notes from database annnd convert to JSON
    fs.readFile("db/db.json","utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);

        // GET route for notes api
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        // create api POST function and push to update database
        app.post("/api/notes", function(req, res) {
            const newNote = req.body;
            req.body.id = uuidv4();
            notes.push(newNote);
            dbUpdate();
        });

        // GET note by id
        app.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

        // delete note by id and update database
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            dbUpdate();
        });

        // show notes.html
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // show index.html
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // function to update database with new notes
        function dbUpdate() {
            fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}





