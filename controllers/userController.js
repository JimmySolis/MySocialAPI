const { User } = require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res){
        User.findOne({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with this ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {email: req.body.email,
            username: req.body.username},
            {new: true},
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json({ message: 'somthing went wrong' })
                }
            }
        );
    },
    addAFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {friend: req.params.friendId},
            {new: true},
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json({ message: 'somthing went wrong' })
                }
            }
        );
    },
    deleteUser(req, res){
        User.findOneAndDelete(
            { _id: req.params.userId },
            (err, result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json({ message: 'something went wrong' });
                }
            }
        )
    }
};