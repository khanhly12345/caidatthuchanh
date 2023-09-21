const express  = require("express")
const contacts  = require("../controllers/contact.controller")

const route = express.Router()

route.route("/")
	.get(contacts.fileAll)
	.post(contacts.create)
	.delete(contacts.delete)
route.route("/favorite")
	.get(contacts.findAllFavorite)
route.route("/:id")
	.get(contacts.findOne)
	.put(contacts.update)
	.delete(contacts.deleteAll)
module.exports = route