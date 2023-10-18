const User = require('../models/User');
const Thought = require('../models/Thought');

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
            const user = await User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .select('-__v');
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
            const user= await User.findOneAndUpdate (
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
    //Bonus: Remove a user's associated thoughts when deleted.  
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
    },
    //friend routes
     //post to add a new friend to user's friend list

  async addFriend(req, res) {
    try{
        const friend = await User.findOneAndUpdate({
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
            const friend = await User.findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true });
            if (!friend) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'Friend deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}   

