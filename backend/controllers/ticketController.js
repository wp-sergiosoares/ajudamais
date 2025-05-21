const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");

const { getTitleFromDeepSeek } = require("../utils/gerarTituloAI");

// get all tickets
// *
// *
// *
// *
const getAllTickets = async (req, res) => {
  const { status, category, typeOfTicket } = req.query;
  const filtro = {};
  if (status) filtro.status = status;
  if (category) filtro.category = category;
  if (typeOfTicket) filtro.typeOfTicket = typeOfTicket;
  try {
    const getAllTickets = await Ticket.find(filtro).sort({ createdAt: -1 });
    res.status(200).json(getAllTickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single ticket by id params
// *
// *
// *
// *
const getSingleTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleTicket = await Ticket.findById(id);
    res.status(200).json(getSingleTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post - cria ticket
// *
// *
// *
// *
const createTicket = async (req, res) => {
  const { description, typeOfTicket, category, status, location } = req.body;

  // Verificação simples
  if (!typeOfTicket || !category || !description) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const title = await getTitleFromDeepSeek(description);

  try {
    const user_id = req.user._id;
    const newTicket = await Ticket.create({
      typeOfTicket,
      title,
      description,
      status,
      category: category.toLowerCase(),
      user_id,
      location: location || undefined,
    });
    res.status(200).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// altera ticket - PATCH
// *
// *
// *
// *
const editTicket = async (req, res) => {
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
};

// delete a ticket
// *
// *
// *
// *
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Ticket.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Ticket não encontrado." });
    }
    res.status(200).json({ message: "Ticket apagado com sucesso." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  editTicket,
  deleteTicket,
};
