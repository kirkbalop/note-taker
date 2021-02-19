// Dependencies
const express = require('express');
const fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3001;

// Setup express app to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('./assets'));

app.listen(PORT, function() {
    console.log('API server now on PORT ' + PORT);
});