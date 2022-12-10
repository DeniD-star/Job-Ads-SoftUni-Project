const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const adController = require('../controllers/adController');

module.exports=(app)=>{
    app.use('/auth', authController)
    app.use('/', homeController)
    app.use('/ads', adController)
}