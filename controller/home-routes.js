const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// Route to GET all already-existing posts from server to show in homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.sender("all-posts", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to GET a single already-existing post from server
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route that GETS login page and, if login info already exists, redirects to homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.sender('signup');
});

// Route that GETS signup page if login does not exist
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.sender('signup');
});

module.exports = router;
