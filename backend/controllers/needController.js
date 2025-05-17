const Need = require("../models/needModel");
const mongoose = require("mongoose");

// get all needs
const getNeeds = async (req, res) => {
  const needs = await Need.find().sort({ createdAt: -1 });

  res.status(200).json(needs);
};

// const getNeeds = async (req, res) => {
//     try {

//         const { lat, lng } = req.query;

//         if (!lat || !lng) {
//             return res.status(400).json({error: "lat e lng sao obrigatorios"})
//         }
//         const userLocation = {
//             type: 'Point',
//             coordinates: [parseFloat(lng), parseFloat(lat)]
//         };

//         const pedidos = await Need.find({
//             location: {
//                 $near: {
//                     $geometry: userLocation,
//                     $maxDistance: 20000
//                 }
//             }
//         });

//         res.json(pedidos)

//     } catch(error) {
//         console.error('Erro ao buscar pedidos:', error);
//         res.status(500).json({ error: 'Erro ao buscar pedidos' });
//     }
// }

// create a new need
const createNeed = async (req, res) => {
  const { title, details, tipo, urgente } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (!tipo) {
    emptyFields.push("tipo");
  }
  if (!urgente) {
    emptyFields.push("urgente");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    //const user_id = req.user._id
    const need = await Need.create({ title, details, tipo, urgente });
    res.status(200).json(need);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single need
const getNeed = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const need = await Need.findById(id);

  if (!need) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(need);
};

// delete a workout
const deleteNeed = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such need" });
  }

  const need = await Need.findOneAndDelete({ _id: id });

  if (!need) {
    return res.status(404).json({ error: "No such need" });
  }

  res.status(200).json(need);
};

module.exports = {
  getNeeds,
  createNeed,
  deleteNeed,
  getNeed,
};
