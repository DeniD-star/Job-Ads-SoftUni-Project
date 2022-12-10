const router = require('express').Router();

router.get('/catalog', async(req, res)=>{
    const ads = await req.storage.getAllAds()
    res.render('all-ads', {ads})
})
module.exports = router;