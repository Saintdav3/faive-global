const cloudinary = require('../config/cloudinary');

const uploadBufferToCloudinary = (fileBuffer, folder, resourceType = 'auto') =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });

module.exports = { uploadBufferToCloudinary };
