const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');


// Configure Multer to store uploaded profile images in the 'uploads' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });




// CREATE/UPDATE USER API
router.post('/createUsers', upload.single('profileImage'), async (req, res) => {
console.log('createusers',req.body)
console.log('req.file.filename',req.file.filename)
    const { firstName, lastName, email, phoneNumber } = req.body;
    const profileImage = req.file.filename;
    try {
      let user = await User.findOneAndUpdate(
        { email: email },
        { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, profileImage: profileImage },
        { new: true, upsert: true }
      );
      res.status(200).json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// List all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json( users );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// DELETE USER API
router.delete('/delete_users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    fs.unlinkSync(`uploads/${user.profileImage}`); // delete the user's profile image file
    await User.findByIdAndRemove(id);
    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET USER BY ID API
router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ message: 'User retrieved successfully', user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Update user
router.patch('/update_users/:id', upload.single('profileImage'), async (req, res) => {
console.log('createusers',req.body)

    const updates = Object.keys(req.body);
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      updates.forEach(update => user[update] = req.body[update]);
      user.profileImage = req.file ? req.file.filename : user.profileImage;
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
