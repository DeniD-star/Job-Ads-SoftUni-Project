const Ad = require('../models/Ad');

async function getAllAds(){
    const ads = await Ad.find({}).lean();
    return ads;
}

async function createAd(adData){
    const ad = new Ad(adData);
    await ad.save()
    return ad;
}
module.exports = {
   getAllAds,
   createAd
}