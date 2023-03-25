const Ticket = require("../models/ticketModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Notes = require("../models/notesModel");

// @desc    Get Notes
// @route   GET /api/tickets/:ticketId/notes
// @access  Private

const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Notes.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private

const addNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Fields cannot be empty");
  }

  const note = await Notes.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = { getNotes, addNote };
