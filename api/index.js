require("dotenv").config();
require("./db/connect.js");
//const http = require("http");
const express = require("express");
//import http from 'http';
const cors = require("cors");
const app = express();
const Player = require("./model/playerModel.js");
const NotFound = require("./errors/not_Found.js");
const castError = require("./errors/castError.js");

const userExtractor = require('./errors/userExtractor.js')
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");
const testingRouter = require('./controllers/testing.js')
const User = require("./model/UserModel.js");

app.use(express.json());
app.use(cors());
app.use(express.static('../app/build'))
//app.use('/images', express.static('../api/images'))
// app.use((req, res, next) => {
//   console.log(req.method);
//   console.log(req.path);
//   console.log(req.body);
//   console.log(req.params);
//   console.log('--------');
//   next();
// })

// let NBAplayers = [
//   {
//     id: 1,
//     name: "LeBron James",
//     team: "LA Lakers",
//   },
//   {
//     id: 2,
//     name: "Stephen Curry",
//     team: "GS Warriors",
//   },
//   {
//     id: 3,
//     name: "Nikola Jokic",
//     team: "D Nugets",
//   },
//   {
//     id: 4,
//     name: "Ja Morant",
//     team: "M Grizzilies",
//   },
//   {
//     id: 5,
//     name: "Jason Tatum",
//     team: "B Celtics",
//   },
// ];

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "aplication/json" }); //content type
//   res.end(JSON.stringify(NBAplayers))
//   //res.end("Hi, Jancy");
// }); <===== parte que funciona con el http

// app.get("/", (req, res) => {
//   res.send("<h1>API DE JUGADORES DE LA NBA!<h1/>");
// });

app.get("/api/players", cors(), (req, res) => {
  Player.find({})
    .populate("user", {
      name: 1,
      username: 1,
      _id: 0,
    })
    .then((players) => res.json(players))
    .catch((err) => console.error(err));
});

app.get("/api/players/:id", (req, res, next) => {
  const { id } = req.params;
  //player = NBAplayers.filter((item) => item.id === id)

  Player.findById(id)
    .then((player) => {
      player ? res.json(player) : res.status(404).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/api/players/team/:team", (req, res, next) => {
  const { team } = req.params;
  Player.find({ team: team })
    .then((player) => {
      player.length !== 0
        ? res.json(player)
        : res.status(404).send({
            error:
              "No se encuentra ninguna informacion con respecto al equipo digitado",
          });
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/players/:id", userExtractor , async (req, res, next) => {
  const { id } = req.params;

  // Player.findByIdAndRemove(id)
  // .then(() => {
  //   res.status(204).end();
  // }).catch(error => next(error))
  try {
    await Player.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/players", userExtractor , async (req, res, next) => {
  try {
    const { name, team } = req.body;

    console.log(req.userId);
    //sacar el userId de req
    const {userId} = req

    const user = await User.findById(userId);

    if (!name) {
      return res.status(400).json({
        error: "El nombre del jugador es un campo requerido.",
      });
    }

    const newPlayer = Player({
      name,
      team,
      user: user._id,
    });

    const savedPlayer = await newPlayer.save();

    user.players = user.players.concat(savedPlayer._id);
    await user.save();

    res.json(savedPlayer);
    console.log("jugador agregado...");
  } catch (error) {
    next(error);
  }
});

app.put("/api/players/:id", userExtractor , (req, res, next) => {
  const { id } = req.params;
  const player = req.body;

  const newPlayerInfo = {
    name: player.name,
    team: player.team,
  };

  Player.findByIdAndUpdate(id, newPlayerInfo, { new: true })
    .then((result) => res.json(result)) //resul y wresult?
    .catch((err) => console.error(err));
});

app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);

if(process.env.NODE_ENV === 'test'){
  app.use("/api/testing/", testingRouter)
}

app.use(NotFound);
app.use(castError);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
