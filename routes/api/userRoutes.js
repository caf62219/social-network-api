// require in express router
const router = require('express').Router();

//require in the api routes
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users Get all users and create a user
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId get one user, update and delete a user
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

//api/users/:userId/friends/:friendId add and delete a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;