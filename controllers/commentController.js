const { Comment } = require('../models/Comment');

const commentController = {
  // Implement comment-related controller methods

  // Get a comment by ID
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);

      if (!comment) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }

      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new comment for a post
  createComment: async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await Comment.create({
        content,
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a comment by ID
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      const [affectedRows] = await Comment.update(
        { content },
        { where: { id: req.params.id, user_id: req.session.user_id } }
      );

      if (affectedRows === 0) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }

      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a comment by ID
  deleteComment: async (req, res) => {
    try {
      const affectedRows = await Comment.destroy({
        where: { id: req.params.id, user_id: req.session.user_id },
      });

      if (affectedRows === 0) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }

      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
