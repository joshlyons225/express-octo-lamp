// express requirements
const express = require('express');
const fs = require('fs');
const path = require('path');

// set PORT and app parameters
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// point to routes
require('./routes/routes')(app);


// set server PORT listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});