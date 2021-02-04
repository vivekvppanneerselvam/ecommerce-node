var cloudinary = require('cloudinary').v2;
var config = require('../configs/cloudinary-config')

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});


module.exports.imageUpload = async function (path, calback) {
    cloudinary.uploader.upload(path, {
        secure: true, transformation: [
            { width: 150, height: 150, gravity: "face", crop: "thumb" }]
    }, calback);
}