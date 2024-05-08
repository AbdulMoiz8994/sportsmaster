const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");


const tokenVerification = (req, res, next) => {
    console.log("Token", req.headers);
    let token = req.headers["token"];
    console.log("Token Section", token);
    
    if (!token) {
        return res.status(404).send({ status: 404, message: "No token provided!" });
    }
    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res
                .status(400)
                .send({ status: 400, message: "Token Unauthorized!" });
        }
        console.log("decoded", decoded);
        req.userId = decoded.id;
        next();
    });
}
module.exports = { tokenVerification: tokenVerification }