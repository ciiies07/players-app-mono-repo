const testingRouter = require('express').Router()
const Player = require('../model/playerModel')
const User = require('../model/UserModel')

testingRouter.post('/reset', async (req, res) => {
    await Player.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

module.exports = testingRouter;
