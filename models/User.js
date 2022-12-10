const {Schema, model} = require('mongoose');

const schema = new Schema({
    email:{type: String, required: true},
    hashedPassword: {type: String, required: true},
    descriptionSkills: {type: String, required: true},
    myAds: [{type: Schema.Types.ObjectId, ref: 'Ads', default: []}]
})

module.exports = model('User', schema);