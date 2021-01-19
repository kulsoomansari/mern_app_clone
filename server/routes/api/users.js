const express = require("express");
const router = express.Router();
const User = require("../../models/users.js");

//Get all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();
    console.log(users);
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    res.status(404).json({ success: false, error: err.message });
  }
});
router.post("/", async (req, res) => {
  console.log(req)
  try{
      const user = await User.create(req.body);
    res.json({
      success: true,
      dbid: user._id,
      status: 201
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }

});

//Get single user
router.get('/:id', async (req, res) => {
    try {
    const userOne = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: userOne });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }

});

router.delete('/:id', async (req, res) => {
  try {
  const delOne = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: 'deleted successfully' });
} catch (err) {
  res.status(400).json({ success: false, error: err.message });
}

});

module.exports = router;
