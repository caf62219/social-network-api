// this section is not correct

const User = require('../models/User');

module.exports = {
    //post to add a new friend to user's friend list

  async createUser(req, res) {
    try{
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

    //delete to remove a friend from user's friend list
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }