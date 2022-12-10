const adService = require('../services/adService')

module.exports = ()=> (req, res, next)=>{
    req.storage = {
        ...adService
    };
    next()
}