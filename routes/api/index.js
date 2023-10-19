//require in express router
const router = require('express').Router();

//require in the api routes
const thoughtRoutes=require('./thoughtRoutes');
const userRoutes=require('./userRoutes');

//add prefix of `/thoughts` to routes created in `thoughtRoutes.js`
router.use('/thoughts', thoughtRoutes);

//add prefix of `/users` to routes created in `userRoutes.js`
router.use('/users', userRoutes);

module.exports = router;