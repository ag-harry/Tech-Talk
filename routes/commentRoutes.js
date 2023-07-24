const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// Create a new comment for a post route
router.post('/:postId', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.userId,
            post_id: req.params.postId,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Other comment routes (get, update, delete) could be similarly defined here...

module.exports = router;
