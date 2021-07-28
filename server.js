const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

// // Connect To DB
let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
	(client) => {
		console.log(`Connected to ${dbName} Database`)
		db = client.db(dbName)
	}
)

// // Setup Server
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// // API - GET
app.get('/', (request, response) => {
	db.collection('rappers')
		.find()
		.sort({ likes: -1 })
		.toArray()
		.then((data) => {
			response.render('index.ejs', { info: data })
		})
		.catch((error) => console.error(error))
})

app.post('/addRapper', (request, response) => {
	db.collection('rappers')
		.insertOne({
			stageName: request.body.stageName,
			birthName: request.body.birthName,
			likes: 0,
		})
		.then((result) => {
			console.log('Rapper Added')
			response.redirect('/')
		})
		.catch((error) => {
			console.log(error)
		})
})
// // Setup Server
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
