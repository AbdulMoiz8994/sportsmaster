const audioArticle = require("../../../modals/audioArticle");
const cloudinary = require("../../../multer/cloundnary");
const fs = require("fs/promises");

const uploadMusicArticle = async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.audio) {
      return res
        .status(400)
        .json({ error: "Image and audio files are required" });
    }
    const fileResult = await cloudinary.uploads(
      req.files.audio[0].path,
      "Audio"
    );

    const imageResult = await cloudinary.uploads(
      req.files.image[0].path,
      "Image"
    );

    console.log("fileResult", fileResult, "imageResult", imageResult);

    let audioObjectUrl = {
      url: fileResult.url,
      id: fileResult.id,
    };

    let imageObjectUrl = {
      url: imageResult.url,
      id: imageResult.id,
    };

    let uploadAudio = new audioArticle({
      name: req.body.name,
      description: req.body.description,
      audio: [audioObjectUrl],
      image: [imageObjectUrl],
    });
    await uploadAudio.save();


    await fs.unlink(req.files.audio[0].path);
    await fs.unlink(req.files.image[0].path);

   return  res.status(200).json({ status: 200, data: uploadAudio });
    
  
    // delete the files from the lcoal storage
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = uploadMusicArticle;
