const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('main/home');
});

router.get('/gigs', (req, res) => {
    res.render('main/gigs');
});

module.exports = router;
