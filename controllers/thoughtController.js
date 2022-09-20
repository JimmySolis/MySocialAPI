const { Thought, User } = require('../models');

module.exports = {
    getThought(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ?res.status(404).json({ message: 'No thought with that ID.'})
            : res.json(thought)
        )
        .catch((err) => res.status(505).json(err));
    },
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: {thought: thought._id} },
                { new: true}
            )
        })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'thought created, but no user with this ID.'})
        : res.json({ message: 'thought created'})
        )
        .catch((err) => {
            console.error(err);
        })
    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json( { message: 'somthing whent wrog' })
                }
            }
        )
    },
    deleteThought(req,res){
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            (err, result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json({ message: ' something went wrong' });
                }
            }
        )
    },
   reactionToThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: {
            reactionBody: req.body.reaction.reactionBody,
            username: req.body.reaction.username
        } 
        }},
        { new: true })
        .populate({ path: 'reaction', select: '-__v' })
        .select('-__v')
        .then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with provided ID' })
                : res.json(dbThoughtData)
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)});
  
    },
    deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { _id: req.params.reactionId } } },
        { new: true })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
};



