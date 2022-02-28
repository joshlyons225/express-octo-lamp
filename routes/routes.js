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
            const noteAdd = (req.body, "review_id: "+randomUUID);
            notes.push(noteAdd);
            dbUpdate();
            return console.log("New note was created: "+noteAdd.title);
        });

        // create html GET function
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    });
}





