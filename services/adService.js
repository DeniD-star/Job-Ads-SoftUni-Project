const Ad = require('../models/Ad');

async function getAllAds(){
    const ads = await Ad.find({}).lean();
    return ads;
}

module.exports = {
   getAllAds
}