const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// Route to GET all posts written by user from server, if they are logged in
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});


