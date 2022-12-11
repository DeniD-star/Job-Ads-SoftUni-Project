const Ad = require('../models/Ad');
const User = require('../models/User');

async function getAllAds(search){
    // const ads = await Ad.find({}).lean();
    // return ads;
        if (search) {
        return Ad
            .find({ author: { $regex: search, $options: 'i' } })
           
            .lean();
    }

   

     return Ad.find({}).lean();
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
    const ad = await Ad.findById(adId).populate('usersApplied').populate('usersEmail').populate('usersSkills');
    const user = await User.findById(userId).lean()
    
    ad.usersApplied.push(user);
  console.log(user.email + '      user');
    console.log(ad.usersApplied   + '  service');
    ad.usersEmail.push((user.email))
    console.log(ad.usersEmail + ' ad.usersEmail');
    console.log(ad.usersEmail.map(x=>x.email));
    ad.usersSkills.push(user.descriptionSkills)
    console.log(ad.usersSkills + ' ad.usersSkills');
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