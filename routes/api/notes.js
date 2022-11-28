const router = require("express").Router();
const { readAndAppend, readFromFile } = require("../../helpers/fsUtils");

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

module.exports = router;
