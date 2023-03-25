const express = require("express");
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { auth } = require("../middlewares/auth");
const notesRouter = require("./notesRoutes");
const router = express.Router();

// Re-route into note router
router.use("/:ticketId/notes", notesRouter);

router.route("/").get(auth, getTickets).post(auth, createTicket);
router
  .route("/:id")
  .get(auth, getTicket)
  .delete(auth, deleteTicket)
  .put(auth, updateTicket);

module.exports = router;
