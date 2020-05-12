require('dotenv').config()
const app = require('./app')

app.listen(process.env.PORT, () => {
	console.log(`Server is now running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode!`)
})