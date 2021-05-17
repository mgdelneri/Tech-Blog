const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// Route to GET all already-existing posts from server to show in homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.sender('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

