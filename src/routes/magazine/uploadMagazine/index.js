const magazine=require("../../../modals/magazine");
const fs = require("fs/promises");
const cloudinary = require("../../../multer/cloundnary");


const uploadMagazine=async(req, res) =>{
    try {
        
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        // Upload file to Cloudinary
        const result = async (path) => await cloudinary.uploads(path, "Pdf");
             
        console.log("result",result);
        // Save file URL to MongoDB
        const file = new magazine({
          name: req.file.originalname,
          url: result.secure_url
        });
        await file.save();
    
        // Delete file from local storage
        // fs.unlinkSync(req.file.path);
    
        return res.status(200).json({ url: result.secure_url });
      } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Internal server error', message: error });
      }
};

module.exports=uploadMagazine;