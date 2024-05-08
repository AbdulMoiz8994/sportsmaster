require("dotenv").config();
const cloudinary=require("cloudinary").v2;

// console.log("CLOUD_NAME:",cloudinary.config().cloud_name);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.uploads=(file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, { 
            resource_type: "auto",
            folder: folder
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    url: result.url,
                    id: result.public_id
                });
            }
        });
    });
};

exports.deleteImage = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};