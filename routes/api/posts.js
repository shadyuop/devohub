const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Schemas
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// Validation
const ValidatePostInput = require('../../validation/post.js');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Posts Works'
}));

// @route   Get api/posts
// @desc    Get post
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({
      nopostfound: 'No Posts found'
    }));
});

// @route   Get api/post/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({
      nopostfound: 'No Post found with that id'
    }));
});

// @route   Post api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = ValidatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route   Delete api/posts/:id
// @desc    Delete the post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notAuthorised: 'User not Authorised'
            });
          }

          //Delete
          post.remove().then(() => res.json({
            success: true
          }));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'The post is not found'
        }));
    })
});



module.exports = router;