const express = require("express");
const Ticket = require("../models/ticketModel");

// controller functions
const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  editTicket,
  deleteTicket,
} = require("../controllers/ticketController");

// vou buscar o user ID
// adiciona ao req a propriedade req.user
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET /api/tickets/nearby?lat=41.15&lon=-8.61&maxDistance=5000
router.get("/nearby", async (req, res) => {
  const { lat, lon, maxDistance = 5000 } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Latitude e longitude são obrigatórios." });
  }

  try {
    const tickets = await Ticket.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance), // em metros
        },
      },
    });

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar tickets próximos." });
  }
});

router.get("/", getAllTickets);
router.get("/:id", getSingleTicket);

router.use(requireAuth);

router.post("/", createTicket);
router.patch("/:id", editTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
