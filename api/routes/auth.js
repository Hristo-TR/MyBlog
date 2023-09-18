const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Register
router.post("/register", async (req, res) => {
    try {
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(500).json("All fields are required.");
      }
  
      const existingUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
  
      if (existingUser) {
        return res.status(400).json("Username or email already exists.");
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
  
      const { password, ...userWithoutPassword } = user._doc;
      res.status(200).json(userWithoutPassword);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  

//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        return res.status(400).json("Wrong username or password!");
      }
  
      const validate = await bcrypt.compare(req.body.password, user.password);
  
      if (!validate) {
        return res.status(400).json("Wrong username or password!");
      }
  
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

module.exports = router