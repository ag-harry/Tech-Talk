const { Post, User, Comment } = require('../models');

const postController = {
  // Implement post-related controller methods

  // Get a single post by ID
  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }]
      });
      if (!post) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.render('post', { post: post.get({ plain: true }) });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }]
      });
      res.render('posts', { posts: posts.map(post => post.get({ plain: true })) });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new post
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await Post.create({ title, content, user_id: req.session.user_id });
      res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a post by ID
  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const [affectedRows] = await Post.update(
        { title, content },
        { where: { id: req.params.id, user_id: req.session.user_id } }
      );
      if (affectedRows === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a post by ID
  deletePost: async (req, res) => {
    try {
      const affectedRows = await Post.destroy({
        where: { id: req.params.id, user_id: req.session.user_id },
      });
      if (affectedRows === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

};

module.exports = postController;

// routes/postRoutes.js =>