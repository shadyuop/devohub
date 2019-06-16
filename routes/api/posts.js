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



// @route   Post api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Checking if the user has already liked the post
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
              alreadyliked: 'User already liked this post'
            });
          }

          // Add user id to likes array
          post.likes.unshift({
            user: req.user.id
          });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'The post is not found'
        }));
    })
});

// @route   Post api/posts/unlike/:id
// @desc    UnLike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Checking if the user hasnt liked the post
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
              notliked: 'User has not yet liked this post'
            });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'The post is not found'
        }));
    })
});

// @route   Post api/posts/comment/:id
// @desc    Add Comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  // Validation
  const {
    errors,
    isValid
  } = ValidatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Logic
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add to Comments array
      post.comments.unshift(newComment);

      // Save Comments Array
      post.save().then(post => res.json(post))
        .catch(err => res.status(404).json({
          postnotfound: 'Post is not found'
        }));
    })
});


module.exports = router;