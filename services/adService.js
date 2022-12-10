const Ad = require('../models/Ad');
const User = require('../models/User');

async function getAllAds(){
    const ads = await Ad.find({}).lean();
    return ads;
}

async function createAd(adData){
    const ad = new Ad(adData);
    await ad.save()
    return ad;
}
async function getAdById(id, authorId){
    const ad = await Ad.findById(id).lean();
    
    return ad;
}

async function getAdUserEmail(id, adAuthorId){
    const ad = await Ad.findById(id);
    const userAdEmail = await User.findById(adAuthorId);
    const email = userAdEmail.email
    console.log(email);
    return email;
}
module.exports = {
   getAllAds,
   createAd,
   getAdById,
   getAdUserEmail
}