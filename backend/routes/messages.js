const express = require("express");
const Message = require("../models/messageModel");

// vou buscar o user ID
// adiciona ao req a propriedade req.user
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    // Obter id do utilizador autenticado
    const userId = req.user._id;

    // Buscar mensagens onde o user é remetente ou destinatário
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    }).sort({ createdAt: -1 }); // Ordenar da mais recente para a mais antiga

    res.status(200).json(messages);
  } catch (error) {
    console.error("Erro ao obter mensagens:", error);
    res.status(500).json({ error: "Erro ao obter mensagens" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, recipient: userId },
      { sender: userId, recipient: req.user.id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
});

router.post("/", requireAuth, async (req, res) => {
  const { recipientId, text } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ msg: "Usuário não autenticado" });
  }

  const message = new Message({
    sender: req.user._id,
    recipient: recipientId,
    text,
  });

  try {
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Erro ao enviar mensagem", error });
  }
});

module.exports = router;
