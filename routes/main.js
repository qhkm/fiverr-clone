const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('main/home');
});

module.exports = router;
