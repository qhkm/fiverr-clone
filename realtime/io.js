const User = require('../models/user');
const Order = require('../models/gig');
const async = require('async');

module.exports = function (io) {

  io
    .on('connection', function (socket) {

      const user = socket.request.user;
      console.log(user.name);
      const orderId = socket.request.session.orderId;
      console.log(orderId);

      socket.join(orderId);

      socket.on('chatTo', data => {
        async.parallel([
          function (callback) {
            io
              . in(orderId)
              .emit('incomingChat', {
                message: data.message,
                sender: user.name,
                senderImage: user.photo,
                senderId: user._id
              });
          },

          function (callback) {
            //Save order object
          }
        ])
      })

    });
}
