const router = require('express').Router();

const {
    getSingleUser,
    getUsers,
    createUser,
    addAFriend,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addAFriend);

module.exports = router;