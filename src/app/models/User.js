const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        todo: { type: Array },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
