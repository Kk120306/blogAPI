const prisma = require("../config/prismaConfig");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function signUp(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Required fields not found." })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({ message: "User created!" });
    } catch (err) {
        console.error("There was a error making the user: ", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );
        console.log(user.role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 3600000 * 6
        });

        return res.status(200).json({ message: "User signed in successfully!" });
    } catch (err) {
        console.error("Could not create user: ", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

function signOut(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.json({ message: "Logged out" });
};

function getData(req, res) {
    jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    error: "Could not connect to the protected route",
                });
            } else {
                res.json({
                    authorizedData,
                });
            }
        }
    );
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getData
}