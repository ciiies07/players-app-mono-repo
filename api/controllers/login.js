const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../model/UserModel");
const { CSECRET } = process.env;

loginRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { username, password } = body;

    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, CSECRET, { expiresIn: "10m" });

    res.send({
      name: user.name,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
