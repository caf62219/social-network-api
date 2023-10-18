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
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select
            .populate('reactions');
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
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
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
    },
    // POST /api/thoughts/:thoughtId/reactions   // add reaction to thought
    async createReachtion(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE /api/thoughts/:thoughtId/reactions/:reactionId   // remove reaction from thought
    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}