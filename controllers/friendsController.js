// this section is not correct

const User = require('../models/User');

module.exports = {
    //post to add a new friend to user's friend list

  async addFriend(req, res) {
    try{
        const friend = await User.findOneandUpdate({
            _id: req.params.userId
        },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
        );
        if (!friend) {
            return res.status(404).json({ message: 'No User found with this id!' });
        }
        res.json(friend);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

    //delete to remove a friend from user's friend list
    async deleteFriend(req, res) {
        try{
            const friend = await User.findOneAndDelete({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }