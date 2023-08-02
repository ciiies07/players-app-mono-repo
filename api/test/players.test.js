const { server } = require("../index");
const mongoose = require("mongoose");
const Player = require('../model/playerModel')
const {api, PlayerTest, getAllPlayersNames} = require('./helpers')

console.log(PlayerTest);

beforeEach(async () => {
    await Player.deleteMany({})

    //parallel
    // const playerOb = PlayerTest.map(player => new Player(player))
    // const promises = playerOb.map(player => player.save())
    // await Promise.all(promises);

    //sequencial
    for(const player of PlayerTest){
      const playeObj = new Player(player);
      await playeObj.save();
    }
})

test("players are returned as json", async () => {
  await api
    .get("/api/players")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test(`there are ${PlayerTest.length} players`, async () => {
  const response = await api.get("/api/players");
  expect(response.body).toHaveLength(PlayerTest.length);
});

test("not add a new player without name", async () => {
    const newPlayer = {
        team: 'Heat'
    }

    await api
    .post('/api/players')
    .send(newPlayer)
    .expect(400)

    const res = await api.get('/api/players')
    expect(res.body).toHaveLength(PlayerTest.length);
})

test("add new player", async () => {
    const newPlayer = {
        name: 'Guillermo Blanco',
        team: 'Heat',
    }

    await api
    .post('/api/players')
    .send(newPlayer)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const {players, res} = await getAllPlayersNames()

    expect(res.body).toHaveLength(PlayerTest.length + 1);
    expect(players).toContain(newPlayer.name)
})

test('a player can be deleted', async () => {
  const {res: firstRes} = await getAllPlayersNames();
  const {body: playerss} = firstRes;
  const playerToDelete = playerss[0];

  await api
  .delete(`/api/players/${playerToDelete.id}`)
  .expect(204)

  const { players, res: secondRes } = await getAllPlayersNames();
  // const { body: contentNames } = secondRes;
  // const names = contentNames.map((it) => it.name);
  
  expect(secondRes.body).toHaveLength(PlayerTest.length - 1)
  expect(players).not.toContain(playerToDelete.name)
})

test("a player do not exist can not be deleted", async () => {
  await api
  .delete('/api/players/abc123')
  .expect(400)

  const { res } = await getAllPlayersNames();

  expect(res.body).toHaveLength(PlayerTest.length)
})

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
