const mongoose = require("mongoose");
const { api, getUsers } = require("./helpers");
const bcrypt = require("bcrypt");
const { server } = require("../index");
const User = require("../model/UserModel");

describe("creating a new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({
      username: "jrcTest",
      name: "Test JRC",
      passwordHash,
    });

    await user.save();
  });

  test("works as expected creating a fresh username", async () => {
    const userAtStart = await getUsers();

    const newUser = {
      username: "jancyDev",
      name: "Jancy",
      password: "tw1tch",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('si el usuario existe la creacion de uno nuevo falla', async () => {
    const userAtStart = await getUsers();

    const newUser = {
        username: "jrcTest",
        name: "Jancy",
        password: "tw1tch",
    };

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    //console.log(result.body.error.errors.username);
    expect(result.body.message).toContain('`username` to be unique')

    const userAtEnd = await getUsers();
    expect(userAtEnd).toHaveLength(userAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});
