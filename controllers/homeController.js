const router = require('express').Router();

router.get('/', async(req, res)=>{
   const ads = await req.storage.getTopAds(3);
   res.render('home', {ads})
})
module.exports = router;