const Thought = require('../models/Thought');

module.exports = {
    // GET /api/thoughts
    async getAllThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// GET /api/thoughts/:thoughtId
    async getThoughtById(req, res) {
        try{       
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
               return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST /api/thoughts   // add thought to user's thought list
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },      
    // PUT /api/thoughts/:thoughtId    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true, runValidators: true })
            if (!thought) {        
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE /api/thoughts/:thoughtId   // remove thought by id
    async deleteThought(req, res) {
        try{
            const thought= await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json({message: 'Thought deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }