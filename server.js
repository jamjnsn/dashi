const settingsFile = './settings.json';
const defaultSettingsFile = './settings.default.json';

const fs = require('fs');

if (!fs.existsSync(settingsFile)) {
    console.log('No settings found, creating default...');
    fs.copyFileSync(defaultSettingsFile, settingsFile);
}

const settings = require(settingsFile);

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? 8000;

var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server started on port ' + port.toString());
});

app.use(express.static('build'));
app.use(express.static('public'));

app.get("/settings", (req, res, next) => {
    const fs = require('fs');
    let file = fs.readFileSync(settingsFile);
    let settings = JSON.parse(file);
    res.json(settings);
});

app.post("/settings", (req, res) => {
    const fs = require('fs');
    fs.writeFileSync(settingsFile, JSON.stringify(req.body, null, 2));
    res.send(200)
});


const multer = require("multer");

function getFilename(file, newFileName) {
    let ext = file.originalname.split('.').pop();
    let filename = newFileName;
    return filename + '.' + ext;
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/icons/"); 
    },
    filename: function(req, file, cb) {
        cb(null, getFilename(file, req.body.linkId));
    }
});

var upload = multer({ storage: storage });

app.post("/icons/upload", upload.single("icon"), (req, res) => {
    res.json({
        fileName: getFilename(req.file, req.body.linkId)
    })
});