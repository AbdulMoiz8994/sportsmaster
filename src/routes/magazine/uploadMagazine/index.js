const magazine=require("../../../modals/magazine");
const fs = require("fs/promises");
const cloudinary = require("../../../multer/cloundnary");


const uploadMagazine=async(req, res) => {
    try {


        if (!req.files || !req.files['file'] || !req.files['image']) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const file = req.files['file'][0]; // Assuming there's only one file for 'file' field
        const imageFiles = req.files['image']; // Array of files for 'image' field

        // Upload 'file' to Cloudinary
        const fileResult = await cloudinary.uploads(file.path, "Pdf");
        // Upload each image in 'imageFiles' array to Cloudinary
        const imageResults = await Promise.all(imageFiles.map(async (imageFile) => {
            return await cloudinary.uploads(imageFile.path, "Image");
        }));

   console.log("imageResults",imageResults);

        // Save file URL and image URLs to MongoDB
        const magazineFile = new magazine({
            name: file.originalname,
            url: fileResult.url,
            id: fileResult.id,
            images: imageResults.map(result => ({ url: result.url, id: result.id }))
        });
        await magazineFile.save();


        // // Add image URLs to the file document
        // file.images = imageUrls;
        // await file.save();




    
        // Delete file from local storage
        // fs.unlinkSync(req.file.path);
    
        return res.status(200).json({ data: magazineFile });
      } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Internal server error', message: error });
      }
};

module.exports=uploadMagazine;