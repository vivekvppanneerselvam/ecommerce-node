
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Mail = require('./Mail');
const crypto = require('crypto');
var env = require('../configs/envConfig')

var userSchema = mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    },
    admin: {
        type: String
    },
    cart: {
        type: Object
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: String
    },
    otp: {
        type: Number
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function (email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
}


module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.comparePassword = function (givenPassword, hash, callback) {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function (callback) {
    User.find(callback)
}

module.exports.getUsersCount = function (callback) {
    User.countDocuments({}, callback)
}


module.exports.forgotpasswordResponse = function (req, callback) {
    console.log(req.body);
    crypto.randomBytes(20, function (err, buf) {
        if (err) throw err;
        var token = buf.toString('hex');
        console.log(token);
        var val = Math.floor(1000 + Math.random() * 9000);
        var query = { email: req.body.email };
        User.findOne(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                req.flash('error', 'No account with that email address exists.');
            }
            var myquery = { email: req.body.email };
            var newvalues = { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000, otp: val } };
            User.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                var emailVal = myquery.email;
                console.log(emailVal);
                const mailOptions = {
                    to: emailVal,
                    from: 'info.darkthoughts@gmail.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        env.frontURL + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                Mail.sendMail(mailOptions, function(err, c){
                    callback(err, c)
                })
            });
        });
    });
}

module.exports.resetpasswordResponse = function (req, callback) {
    console.log("welcome");
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, callback);
}


module.exports.setpasswordResponsemail = function (req, callback) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            throw { message: 'Password reset token is invalid or has expired.' };
        }
        var myquery = { resetPasswordToken: req.params.token };
        var newvalues = { $set: { password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined, modifiedDate: Date(Date.now()) } };
        User.updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            var mailOptions = {
                to: result.email,
                from: 'info.darkthoughts@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + result.email + ' has just been changed.\n'
            };
            Mail.sendMail(mailOptions, callback)
        });
    });

} 