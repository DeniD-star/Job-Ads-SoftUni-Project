const { isUser } = require('../middlewares/guards');
const userService = require('../services/userService')
const {parseError} = require('../util/parse')

const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const ads = await req.storage.getAllAds()
    res.render('all-ads', { ads })
})

router.get('/create', isUser(), (req, res) => {
    res.render('create')
})
router.post('/create', isUser(), async (req, res) => {
    try {

        const adData = {
            headline: req.body.headline.trim(),
            location: req.body.location.trim(),
            companyName: req.body.companyName.trim(),
            descriptionCompany: req.body.descriptionCompany.trim(),
            author: req.user._id,
            usersApplied: [],
            usersEmail: [],
            usersSkills: []
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


router.get('/details/:id', async (req, res) => {
    try {

        const ad = await req.storage.getAdById(req.params.id);
        const userEmail = await req.storage.getAdUserEmail(req.params.id, ad.author);
      
        if(req.user){
            const user = await userService.getUserByEmail(req.user.email)
            ad.hasUser = Boolean(req.user);
            ad.isOwner = req.user && req.user._id == ad.author;
            ad.added = req.user && ad.usersApplied.find(x => x._id == req.user._id)
      
        //  ad.usersEmail= ad.usersEmail.join(', ')
        console.log(ad.usersEmail);
        console.log(ad.usersSkills);



           
        }
       
        res.render('details', { ad, userEmail })

    } catch (err) {

        console.log(err.message);
        res.redirect('/ads/404')

    }
})


router.get('/404', (req, res)=>{
    res.render('404')
})

router.get('/edit/:id', isUser(), async (req, res) => {
    try {

        const ad = await req.storage.getAdById(req.params.id);

        if (ad.author != req.user._id) {
            throw new Error('You cannot edit an ad that you have not create!')
        }

        res.render('edit', {ad})

    } catch (err) {
        console.log(err.message);
        res.redirect('/ads/catalog')
    }
})
router.post('/edit/:id', isUser(), async (req, res) => {
    try {

        const ad = await req.storage.getAdById(req.params.id);

        if (ad.author != req.user._id) {
            throw new Error('You cannot edit an ad that you have not create!')
        }
        await req.storage.editAd(req.params.id, req.body)
        res.redirect('/ads/catalog')

    } catch (err) {
        console.log(err.message);

        const ctx = {
            errors: parseError(err),
            ad: {
                _id: req.params.id,
                headline: req.body.headline,
                location: req.body.location,
                companyName: req.body.companyName,
                descriptionCompany: req.body.descriptionCompany,
            }
        }
        res.render('edit', ctx)
    }
})


router.get('/delete/:id', isUser(), async(req, res)=>{
    try {
        const ad = await req.storage.getAdById(req.params.id);

        if (ad.author != req.user._id) {
            throw new Error('You cannot delete an ad that you have not create!')
        }

        await req.storage.deleteAd(req.params.id);
        res.redirect('/ads/catalog')
    } catch (err) {
        res.redirect('/ad/details' + req.params.id)
    }
})


router.get('/apply/:id', isUser(), async(req, res)=>{
    try {

        const ad = await req.storage.getAdById(req.params.id);

        if(ad.author == req.user._id){
            throw new Error ('Cannot apply your own ad!')
        }
    await req.storage.applyAd(req.params.id, req.user._id);
        res.redirect('/ads/details/' + req.params.id);
        
    } catch (err) {
        console.log(err.message);
        res.redirect('/ads/details/' + req.params.id)
    }
})

router.get('/search', async(req, res)=>{
    res.render('search')
})

router.post('/search', async(req, res)=>{
    
    const ads = await req.storage.getAllAds( );
    
})
module.exports = router;