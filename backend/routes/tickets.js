const express = require("express");
const Ticket = require("../models/ticketModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, isCompleted, description, category } = req.body;
  try {
    const newTicket = await Ticket.create({
      title,
      isCompleted,
      description,
      category,
    });
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { isCompleted, category } = req.query;
  const filtro = {};
  if (isCompleted) filtro.isCompleted = isCompleted;
  if (category) filtro.category = category;
  try {
    const getAllTickets = await Ticket.find(filtro).sort({ createdAt: -1 });
    res.status(200).json(getAllTickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  //res.status(200).json({ id: id, title: title, isCompleted: isCompleted });

  try {
    const editTicket = await Ticket.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true, runValidators: true }
    );
    if (!editTicket) {
      return res.status(404).json({ error: "Ticket não encontrado." });
    }
    res.status(200).json(editTicket);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTicket = await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket apagado com sucesso." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/por-completar/", async (req, res) => {
  const getTicketsByStatus = await Ticket.find({ isCompleted: false });
  res.status(200).json(getTicketsByStatus);
});

router.get("/completos/", async (req, res) => {
  const getTicketsByStatus = await Ticket.find({ isCompleted: true });
  res.status(200).json(getTicketsByStatus);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleTicket = await Ticket.findById(id);
    res.status(200).json(getSingleTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
