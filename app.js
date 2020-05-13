const express = require('express')
const app = express()
const rootRoutes = require('./routes/root.routes')
const goalRoutes = require('./routes/goal.routes')
const mongodb = require('./mongodb/mongodb.connect')

mongodb.connect()

app.use(express.json())

app.use('/goals', goalRoutes)

app.use('/', rootRoutes)

app.use((error, req, res, next) => {
	res.status(500).json({ message: error.message})
})

module.exports = app