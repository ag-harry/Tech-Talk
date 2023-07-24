const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A user can make many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'  // this alias is used to enable the {{post.User.username}} reference in handlebars
});

// A user can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'  // this alias is used to enable the {{comment.User.username}} reference in handlebars
});

// A post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// A comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
