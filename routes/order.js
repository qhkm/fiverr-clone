const router = require('express').Router();
const Gig = require('../models/gig');
const stripe = require('stripe')('sk_test_VBo5DZeMx19wmpLPcJ49esfs');
const Order = require('../models/order');
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
                var order = new Order();
                order.buyer = req.user._id;
                order.seller = gig.owner;
                order.gig = gig._id;
                order.save((err) => {
                    req.session.gig = null;
                    req.session.price = null;
                    res.redirect('/users/' + req.user._id + '/orders/' + order._id);
                })
            })
            .catch((err) => {
                // Deal with an error
            });
    });

router.get('/users/:userId/orders/:orderId', (req, res) => {
    req.session.orderId = req.params.orderId;
    Order
        .findOne({_id: req.params.orderId})
        .populate('buyer')
        .populate('seller')
        .populate('gig')
        .exec((err, order) => {
            res.render('order/order-room', {
                layout: 'chat-layout',
                order: order
            });
        });
})

module.exports = router;