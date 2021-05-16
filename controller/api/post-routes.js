const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Connects with router in the back-end to POST newly-created post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Connects with router in the back-end to UPDATE existent post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [relevantPost] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (relevantPost > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Connects with router in the back-end to DELETE existent post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [relevantPost] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (relevantPost > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
