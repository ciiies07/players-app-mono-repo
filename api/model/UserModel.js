const {model, Schema } = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema)

module.exports = User