const settingsFile = './settings.json';
const defaultSettingsFile = './settings.default.json';

const fs = require('fs');

if (!fs.existsSync(settingsFile)) {
    console.log('No settings found, creating default...');
    fs.copyFileSync(defaultSettingsFile, settingsFile);
}

const settings = require(settingsFile);

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
    let file = fs.readFileSync(settingsFile);
    let settings = JSON.parse(file);
    res.json(settings);
});

app.put("/settings", (req, res) => {
    const fs = require('fs');
    fs.writeFileSync(settingsFile, JSON.stringify(req.body, null, 2));
});