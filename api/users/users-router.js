const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch(err) { next(err) }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch(err) { next(err) }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  const { id } = req.params;
  const userToUpdate = req.body;

  try {
    const updatedUser = await Users.update(id, userToUpdate);
    updatedUser
      ? res.status(200).json({ id, name: userToUpdate.name })
      : res.status(500).json({ message: "update failed, please try again" })
  } catch(err) { next(err) }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    const userToDelete = await Users.getById(id);
    const deletedUser = await Users.remove(id);
    deletedUser
      ? res.json(userToDelete)
      : res.status(500).json({ message: "deletion failed, please try again" })
  } catch(err) { next(err) }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch(err) { next(err) }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  const postToInsert = {
    text: req.body.text,
    user_id: req.params.id || null
  }
  try {
    const newPost = await Posts.insert(postToInsert);
    res.status(201).json(newPost);
  } catch(err) { next(err) }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "Something went wrong in the users router"
  })
})

// do not forget to export the router
module.exports = router;