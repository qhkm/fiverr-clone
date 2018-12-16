const router = require('express').Router();
const Gig = require('../models/gig');
const User = require('../models/user');
const async = require('async');

router.get('/', (req, res, next) => {
    res.render('main/home');
});

router.get('/gigs', (req, res) => {
    Gig
        .find({
            owner: req.user._id
        }, function (err, gigs) {
            res.render('main/gigs', {gigs: gigs})
        })
});

router
    .route('/add-new-gig')
    .get((req, res) => {
        res.render('main/add-new-gig');
    })
    .post((req, res) => {
        async.waterfall([function (callback) {
                let gig = new Gig();
                gig.owner = req.user._id;
                gig.title = req.body.gig_title;
                gig.category = req.body.gig_category;
                gig.about = req.body.gig_about;
                gig.price = req.body.gig_price;
                gig.save(function (err, gig) {
                    User
                        .update({
                            _id: req.user._id
                        }, {
                            $push: {
                                gigs: gig._id
                            }
                        }, function (err, count) {
                            res.redirect('/gigs');
                        })
                });
            }
        ]);
    });

module.exports = router;
