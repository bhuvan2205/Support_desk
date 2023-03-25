const express = require("express");
const { getNotes, addNote } = require("../controllers/notesController");

const router = express.Router({ mergeParams: true });

const { auth } = require("../middlewares/auth");

router.route("/").get(auth, getNotes).post(auth, addNote);

module.exports = router;
