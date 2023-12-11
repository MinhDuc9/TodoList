const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Admin = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        employees: { type: Array },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Admin', Admin);
