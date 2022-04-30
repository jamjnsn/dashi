const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const settingsFile = './config/settings.json'
const defaultSettingsFile = './settings.default.json'
const iconsPath = './config/icons'

const serverConfig = require('./server_config.json')

if (!fs.existsSync(settingsFile)) {
	console.log('No settings found, creating default...')
	fs.copyFileSync(defaultSettingsFile, settingsFile)
}

if (!fs.existsSync(iconsPath)) {
	fs.mkdirSync(iconsPath)
}

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(serverConfig.port, () => {
	console.log('Server started on port ' + serverConfig.port.toString())
})

// Add static directories
app.use(express.static('dist'))
app.use(express.static('static'))
app.use(express.static('config'))

// Settings routes
app.get('/settings', (req, res, next) => {
	let file = fs.readFileSync(settingsFile)
	let settings = JSON.parse(file)
	res.json(settings)
})

app.post('/settings', (req, res) => {
	fs.writeFileSync(settingsFile, JSON.stringify(req.body, null, 2))
	res.send(200)
})

// Icon upload handling

function getFilename(file, newFileName) {
	let ext = file.originalname.split('.').pop()
	let filename = newFileName
	return filename + '.' + ext
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, iconsPath + '/')
	},
	filename: function (req, file, cb) {
		cb(null, getFilename(file, req.body.linkId))
	},
})

var upload = multer({ storage: storage })

app.post('/icons/upload', upload.single('icon'), (req, res) => {
	res.json({
		fileName: getFilename(req.file, req.body.linkId),
	})
})
