const express = require("express");
const Ticket = require("../models/ticketModel");

const { getTitleFromDeepSeek } = require("../utils/gerarTituloAI");

// const gerarTitulo = require("../utils/gerarTituloAI");

const router = express.Router();

router.post("/", async (req, res) => {
  const { description } = req.body;

  const title = await getTitleFromDeepSeek(description);

  try {
    const newTicket = await Ticket.create({
      title,
      description,
      category: "Outros",
      //status: "pendente",
    });
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { status, category } = req.query;
  const filtro = {};
  if (status) filtro.status = status;
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
  const { title, description, category, status } = req.body;

  const updateData = {};

  if (title) {
    updateData.title = title;
  }
  if (description) {
    updateData.description = description;
  }

  if (category) {
    const categoryNormalizada = category
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    updateData.category = categoryNormalizada;
  }
  if (status) {
    updateData.status = status.toLowerCase();
  }

  //res.status(200).json({ id: id, title: title, isCompleted: isCompleted });

  try {
    const editTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
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
