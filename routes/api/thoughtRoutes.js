const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    reactionToThought,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').put(reactionToThought);

router.route('/:thoughtId/reactions/:reactionId').put(deleteReaction)

module.exports = router;