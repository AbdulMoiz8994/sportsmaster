const blog=require("../../../modals/blog");
const fs = require("fs/promises");
const cloudinary = require("../../../multer/cloundnary");


const uploadBlog=async(req, res)=>{
    try {
 
        let uploader = async (path) => await cloudinary.uploads(path, "Image");
        if (req.method == "POST") {
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            console.log("newPath", path);
            urls.push(newPath);
            await fs.unlink(path);
          }
          console.log("urls",urls);
          // let imgDescArray=[req.body.imgDescription];

          if (urls) {
            let fianlRrsp = {
              image: [],
              ...req.body,
            };
            let uploadDesciption=req.body.description;
            console.log("uploadDesciption",uploadDesciption);
            const descriptionsArray = req.body.imgDescription.split(',');

            for (let i = 0; i < urls.length; i++) {
              // Construct image object with URL and description
              const imageObject = {
                  url: urls[i].url,
                  imgDescription: descriptionsArray[i],
              };
              // Push the image object into the image array
              fianlRrsp.image.push(imageObject);
          }


            console.log("fianlRrsp", fianlRrsp);
            const newPackage = await blog.create(fianlRrsp);
            return res
              .status(201)
              .json({
                status: 201,
                message: "successfully added",
                data: newPackage,
              });
          }
        }
      } catch (err) {
        return res.status(405).json({ status: 405, message: err.message });
      }
}

module.exports=uploadBlog;



