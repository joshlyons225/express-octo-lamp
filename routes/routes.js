const fs = require('fs');
const path = require('path');

// export app function
module.exports = app => {

    // read notes from database
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

    // create api GET function

    // create api POST function


    // create html GET function

    // create html POST function

    });
}





