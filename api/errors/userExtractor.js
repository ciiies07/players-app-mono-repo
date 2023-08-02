const jwt = require("jsonwebtoken");
const { CSECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
    console.log(token);
  }

  const decodedToken = jwt.verify(token, CSECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "error de autentificación" });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};
