const router = require('express').Router();
// import all the api routes 
const apiRoutes = require('./api');

// add prefix of `/api` to all the api routes

router.use('/api', apiRoutes);
// if route is not found, return 404 status
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;