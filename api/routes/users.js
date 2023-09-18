const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json("Invalid request!");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  } else {
    res.status(401).json("Invalid request!");
  }
});

//Get user
router.get("/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err.message);

    }
})

//Get user by username
router.get("/:username", async (req, res)=>{
  try {
      const user = await User.findOne({username: req.params.username})
      const {password, ...others} = user._doc
      res.status(200).json(others)
  } catch (err) {
      res.status(500).json(err.message);

  }
})


module.exports = router;
