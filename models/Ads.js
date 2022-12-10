const { Schema, model } = require('mongoose');

const schema = new Schema({
    headline: { type: String, required: true },
    location: { type: String, required: true },
    companyName: { type: String, required: true },
    descriptionCompany: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    usersApplied: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

module.exports = model('Ads', schema);