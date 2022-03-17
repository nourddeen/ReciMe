const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    cloud_api: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_API_SECRET
})

module.exports = cloudinary;