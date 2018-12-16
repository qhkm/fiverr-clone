const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('main/home');
});

router.get('/gigs', (req, res) => {
    res.render('main/gigs');
});

router.get('/add-new-gig', (req, res) => {
    res.render('main/add-new-gig');
})

module.exports = router;
