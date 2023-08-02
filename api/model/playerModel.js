const mongoose = require('mongoose')
const {model, Schema } = mongoose

const playerSchema = new Schema({
    name: String,
    team: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
})

playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Player = model('Player', playerSchema)

// const player = new Player({
//     name: 'LeBron James',
//     team: 'Lakers',
// })

// player.save()
// .then(result => console.log(result))
// .catch(err => console.error(err))

// Player.find({})
// .then(result => {
//     console.log('encontrando...');
//     console.log(result)
//     mongoose.connection.close()
// })

module.exports = Player