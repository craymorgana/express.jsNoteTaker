const path = require('path');
const router = require("express").Router();
const apiRoutes = require('./api')


router.get("/", (req, res) =>
	res.sendFile(path.join("./public/index.html"))
);

router.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/notes.html"))
);

router.use('/api', apiRoutes)

router.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "git status/public/index.html"))
);


module.exports = router;
