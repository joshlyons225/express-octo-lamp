const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

// export app function
module.exports = app => {

    // pull notes from database annnd convert to JSON
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);

        // function to update database with new notes
        function dbUpdate () {
            fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
                if (err) throw err;
                return true;
            });
        }

        // create api GET function and convert notes to JSON
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        // create api POST function and push to update database
        app.post("api/notes", function(req, res) {
            const newNote = (req.body, "note_id: "+randomUUID);
            notes.push(newNote);
            dbUpdate();
            console.log("New note was created");
            return console.log(newNote);
        });

        // create GET function for notes.html
        app.get("/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // create GET function for index.html
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    });
}





