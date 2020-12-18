const settings = require('./settings.json');

const host = settings.host ?? 'localhost';
const port = settings.port ?? 8000;

var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server started on port ' + port.toString());
});

app.use(express.static('build'));
app.use('/icons', express.static('icons'));

app.get("/settings", (req, res, next) => {
    const fs = require('fs');
    let file = fs.readFileSync('./settings.json');
    let settings = JSON.parse(file);
    res.json(settings);
});

app.put("/settings", (req, res) => {
    const fs = require('fs');
    fs.writeFileSync('./settings.json', JSON.stringify(req.body, null, 2));
});