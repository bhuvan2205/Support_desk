const Ticket = require("../models/ticketModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

// @desc    Get Tickets
// @route   GET /api/tickets
// @access  Private

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get Ticket
// @route   GET /api/tickets/:id
// @access  Private

const getTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  if (!ObjectId.isValid(ticketId)) {
    res.status(400);
    throw new Error("Not a valid ID");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

// @desc    Update Ticket
// @route   PUT /api/tickets/:id
// @access  Private

const updateTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  if (!ObjectId.isValid(ticketId)) {
    res.status(400);
    throw new Error("Not a valid ID");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// @desc    Delete Ticket
// @route   DELETE /api/tickets/:id
// @access  Private

const deleteTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;
  if (!ObjectId.isValid(ticketId)) {
    res.status(400);
    throw new Error("Not a valid ID");
  }

  const ticket = await Ticket.findByIdAndDelete(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  res.status(200).json({ success: true });
});

// @desc    Create Tickets
// @route   POST /api/tickets
// @access  Private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
