const express = require("express");
const Ticket = require("../models/ticketModel");

// controller functions
const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  editTicket,
  deleteTicket,
  getTicketsNearBy,
  getCategoriasUnicas,
} = require("../controllers/ticketController");

// vou buscar o user ID
// adiciona ao req a propriedade req.user
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/categorias", getCategoriasUnicas);
router.get("/nearby/", getTicketsNearBy);

router.get("/", getAllTickets);
router.get("/:id", getSingleTicket);

router.use(requireAuth);

router.post("/", createTicket);
router.patch("/:id", editTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
