// Finds modules with models for User, Post, and Comment
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Associations between models

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Comment,
  Post,
};
