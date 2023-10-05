const ApiError = require("../api-error")
const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
	if(!req.body?.name) {
		return next(new ApiError(400, "Name cannot be empty"))
	}

	try {
		const contactService = new ContactService(MongoDB.client)
		const document = await contactService.create(req.body)
		return res.send(document)
	} catch (error) {
		return next(
			new ApiError(500, "an error occured while creating the contact")
		)
	}
}
exports.fileAll = async (req, res, next) => {
	let documents = []
	try {
		const contactService = new ContactService(MongoDB.client)
		const {name} = req.body;
		if(name) {
			documents = await contactService.findByName(name)
		}else{
			documents = await contactService.find({})
		}
	} catch (error) {
		return next(
			new ApiError(500, "an error occured while retrieving the contact")
		)
	}
	return res.send(documents);
}
exports.findOne =  async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client)
		const document = await contactService.findById(req.params.id);
		if(!document) {
			return next(new ApiError(404, "contact not found"));
		}
		return res.send(document);
	} catch (error) {
		return next(
			new ApiError(500, `Error retriving contact with id=${req.params.id}`)
		)
	}
}
exports.update = async (req, res, next) => {
	if(Object.keys(req.body).length === 0) {
		return next(new ApiError(400, "Data to update cannot be empty"))
	}
	try {
		const contactService = new ContactService(MongoDB.client)
		const document = await contactService.update(req.params.id, req.body)
		if(!document) {
			return next(new ApiError(404, "contact not found"))
		}
		return res.send({ message: "contact was updated successfulyly!"})
	} catch (error) {
		return next(
			new ApiError (500, `Error updating contact with id=${req.params.id}`)
		);
	}
}
exports.delete = async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client)
		const document = await contactService.delete(req.params.id)
		if(!document) {
			return next(
				new ApiError(404, "contactnot found")
			)
		}
	} catch (error) {
		return next(
			new ApiError (500, `Error delete contact with id=${req.params.id}`)
		);
	}
}
exports.deleteAll = async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client)
		const deleteCount = await contactService.deleteAll()
		return res.send({
			message: `${deleteCount} conttacts were deleted successfully`
		})
	} catch (error) {
		return next(
			new ApiError (500, "an Error occured while removing all contacts")
		);
	}
}
exports.findAllFavorite = async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client)
		const document = await contactService.findFavorite()
		return res.send(documents);
	} catch (error) {
		return next(
			new ApiError (500, "An error occured while retrieving favorite contacts")
		);
	}
}