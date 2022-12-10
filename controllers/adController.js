const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/catalog', async(req, res)=>{
    const ads = await req.storage.getAllAds()
    res.render('all-ads', {ads})
})

router.get('/create', isUser(), (req, res)=>{
    res.render('create')
})
router.post('/create', isUser(), async(req, res)=>{
   try {

    const adData = {
        headline: req.body.headline.trim(),
        location: req.body.location.trim(),
        companyName: req.body.companyName.trim(),
        descriptionCompany: req.body.descriptionCompany.trim(),
        author: req.user._id,
        usersApplied: []
    }

    await req.storage.createAd(adData)
        res.redirect('/ads/catalog')
   } catch (err) {
    console.log(err.message);
    let errors;
    if (err.errors) {
        errors = Object.values(err.errors).map(e => e.properties.message);
    } else {
        errors = [err.message]
    }

    const ctx = {
        errors,
        adData: {
            headline: req.body.headline,
            location: req.body.location,
            companyName: req.body.companyName,
            descriptionCompany: req.body.descriptionCompany,
           
        }
    }
    res.render('create', ctx)

   }
})
module.exports = router;