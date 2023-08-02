const bcrypt = require("bcrypt");
const usersRouter = require("express").Router(); //rutas separadas
const User = require("../model/UserModel");

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate('players', {
      name: 1,
      team: 1,
      _id: 0,
    })
    res.json(users)
  } catch (error) {
    
  }
})

usersRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { username, name, password } = body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
});

module.exports = usersRouter;
