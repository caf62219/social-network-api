// Purpose: to create the routes for the thoughts
//require in express router
const router = require('express').Router();

//require in the api routes
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts this gets all thoughts and posts a new thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId this gets one thought, updates a thought, and deletes a thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

//api/thoughts/:thoughtId/reactions this creates a reaction
router.route('/:thoughtId/reactions').post(createReaction);

//api/thoughts/:thoughtId/reactions/:reactionId this deletes a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;