const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" })
        }

        if (username.trim().length < 3) {
            return res.status(400).json({ error: "Username must be at least 3 characters" })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" })
        }

        const oldUser = await Users.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username }]
        })

        if (oldUser) {
            return res.status(400).json({ error: "Email or username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const user = await Users.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const samePassword = await bcrypt.compare(password, user.password)

        if (!samePassword) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}
