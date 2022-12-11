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
async function getAdById(id){
    return Ad.findById(id).lean();

}

async function getAdUserEmail(id, adAuthorId){
    const ad = await Ad.findById(id);
    const userAdEmail = await User.findById(adAuthorId);
    const email = userAdEmail.email
    console.log(email);
    return email;
}

async function editAd(adId, newId){
    const ad = await Ad.findById(adId);
    ad.headline= newId.headline,
    ad.location =newId.location,
    ad.companyName = newId.companyName,
    ad.descriptionCompany= ad.descriptionCompany

    return ad.save()
}

async function deleteAd(id){
    return Ad.findByIdAndDelete(id)
}

async function applyAd(adId, userId){
    const ad = await Ad.findById(adId).populate('usersApplied');
    const user = await User.findById(userId)
    ad.usersApplied.push(userId);
   
    return ad.save()
}

async function getTopAds(size) {
    return Ad
    .find({})
    .limit(size)
    .lean();
}
module.exports = {
   getAllAds,
   createAd,
   getAdById,
   getAdUserEmail,
   editAd,
   deleteAd,
   applyAd,
   getTopAds
}