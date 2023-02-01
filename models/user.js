/**
 * @file User model
 */

const mongoose = require('mongoose'); // require mongoose to create model
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } }; // allow virtuals (https://mongoosejs.com/docs/tutorials/virtuals.html)
const passportLocalMongoose = require('passport-local-mongoose'); // mongoose plugin to build username and password with passport (https://www.npmjs.com/package/passport-local-mongoose)


const UserSchema = new Schema({
    // code to change password
    randCodeHash: {
        type: String
    },
    // time in which change password change was requested
    // use to destroy randCodeHash after some time
    randCodeTimeStamp: {
        type: Number
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);