const User = require('../models/User');

module.exports = {
    // GET /api/users
    async getAllUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// GET /api/users/:userId
    async getUserById(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId });
            
            if (!user) {
               return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST /api/users
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // PUT /api/users/:userId
    async updateUser(req, res) {
        try{
            const user= await User.findOneAndUdate (
                { _id: req.params.userId },
                { $set: req.body },
                { new: true, runValidators: true }
                );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }, 
    // DELETE /api/users/:userId
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thought.deleteMany({ username: user.username });

            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}   