const { Schema, model } = require('mongoose');

const schema = new Schema({
    headline: { type: String, required: [true, 'Headline is required'], minLength: [4, 'Headline has to be at least 4 characters long!'] },
    location: { type: String, required: [true, 'Location is required'], minLength: [8, 'Location has to be at least 8 characters long!'] },
    companyName: { type: String, required: [true, 'Name of company is required'], minLength: [3, 'Company name has to be at least 3 characters long!'] },
    descriptionCompany: { type: String, required: [true, 'Description is required'], maxLength: [40, 'Description cannot be more than 40 characters long!'] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    usersApplied: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

module.exports = model('Ad', schema);