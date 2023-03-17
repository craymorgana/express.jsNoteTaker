const router = require("express").Router();
const { json } = require("express");
const { readAndAppend, readFromFile, writeToFile } = require("../../helpers/fsUtils");
const uuid = require('../../helpers/uuid');

router.get("/", (req, res) => {
	console.info(`${req.method} request received for notes`);
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
	// Log that a POST request was received
	console.info(`${req.method} request received to save note`);

	const { title, text } = req.body;

	if (title && text) {
		const newNote = {
			title,
			text,
            id: uuid(),
		};

		readAndAppend(newNote, "./db/db.json");

		const response = {
			status: "success",
			body: newNote,
		};

		res.json(response);
	} else {
		res.json("Error in posting new note");
	}
});

router.delete("/:id", (req, res) => {
	console.info(`${req.method} request received for notes`);
	const id = req.params.id;
	readFromFile('./db/db.json')
	.then((data) => JSON.parse(data))
	.then((json) => {

		const result = json.filter((title) => title.id !== id);

		writeToFile('./db/db.json', result);
		res.json(`Note ${id} has been deleted 🗑️`)
	})


})

module.exports = router;
