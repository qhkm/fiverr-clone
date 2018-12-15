const User = require('../models/user');

module.exports = function(io) {

  io.on('connection', function(socket) {

    const user = socket.request.user;
    console.log(user.name);



  });
}
