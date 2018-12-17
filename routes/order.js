const router = require('express').Router();
const Gig = require('../models/gig');
const stripe = require('stripe')('sk_test_VBo5DZeMx19wmpLPcJ49esfs');
const fee = 3.15;

router.get('/checkout/single-package/:id', (req, res, next) => {
    Gig
        .findOne({
            _id: req.params.id
        }, function (err, gig) {
            var totalPrice = gig.price + fee;
            req.session.gig = gig;
            req.session.price = totalPrice;
            res.render('checkout/single-package', {
                gig: gig,
                totalPrice: totalPrice
            });
        });
});

router
    .route('/payment')
    .get((req, res, next) => {
        res.render('checkout/payment');
    })
    .post((req, res, next) => {
        var gig = req.session.gig;
        var price = req.session.price;
        price *= 100;
        stripe
            .customers
            .create({email: req.user.email})
            .then((customer) => {
                return stripe
                    .customers
                    .createSource(customer.id, {source: req.body.stripeToken});
            })
            .then((source) => {
                return stripe
                    .charges
                    .create({amount: price, currency: 'usd', customer: source.customer});
            })
            .then((charge) => {
                res.redirect('/');
            })
            .catch((err) => {
                // Deal with an error
            });
    })

module.exports = router;
