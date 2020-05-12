exports.getRoot = (req, res, next) => {
	res.status(200).json({ data: 'Welcome to my CRUD app!'})
}