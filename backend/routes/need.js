const express = require('express')


const {
    createNeed,
    getNeeds,
    deleteNeed,
    getNeed
} = require('../controllers/needController')


const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workouts routes
// passa user se estiver logado senao da erro 
router.use(requireAuth)

// Get all workouts
router.get('/', getNeeds)

// GET single
router.get('/:id', getNeed)

// POST a new need
router.post('/', createNeed)

// DELETE a new workout
router.delete('/:id', deleteNeed)

module.exports = router