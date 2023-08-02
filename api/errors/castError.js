const castError = (error, req, res, next) => {
  console.log(error.name);
  console.error(error.name)
  error.name === "CastError"
    ? res
        .status(400)
        .send({ error: "problemas con el parametro que has enviado" })
    : error.name === "JsonWebTokenError"
    ? res.status(401).json({ error: "Token inválido" })
    : error.name === "TokenExpiredError"
    ? res.status(401).json({ error: "Token expirado" })
    : res.status(500).end();
};

module.exports = castError;
