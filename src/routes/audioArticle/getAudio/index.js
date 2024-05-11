const audioArticle = require("../../../modals/audioArticle");

const getAudioArticle = async (req, res) => {
  try {
    let getAllArticle = await audioArticle.find();

    return res.status(200).json({ status: 200, data: getAllArticle });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
module.exports=getAudioArticle;