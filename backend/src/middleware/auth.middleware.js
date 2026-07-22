const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ error: "Token not found, please register or login" })
    }

    const token = authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "Token not found, please register or login" })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}

module.exports = verifyToken
