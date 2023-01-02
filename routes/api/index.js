const router = require('express').Router();
const notesRouter = require('./notes');

//api

router.use('/notes', notesRouter);

module.exports = router;