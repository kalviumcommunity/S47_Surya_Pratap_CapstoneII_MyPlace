import bcryptjs from "bcryptjs";
import { ValidateUser } from "../Validator/signup.Validator.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const { error, value } = ValidateUser(req.body);
    if (error) {
        console.log(error.details);
        return res.status(400).send({ error: error.details });
    }

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).send({ "User created": newUser });
        console.log("User created");
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.username) {
            return res.status(400).send({ error: "Username already exists" });
        }
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

export const signin = async (req, res) => {

    const { email, password } = req.body
    console.log(req.body);

    try {

        const validUser = await User.findOne({ email })
        if (!validUser) {
            return res.status(400).send("User Not Found")
        }

        const userData = validUser
        const passwordMatches = await bcryptjs.compare(password, userData.password)
        if (passwordMatches) {
            const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY)
            res.status(200).send({ token, userData })
        } else {
            res.status(500).send("Invalid Credentials")
        }

    } catch (error) {
        console.log(error);
    }
}

export const google = async (req, res) => {
    try {
        console.log("google user info", req.body.image);
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
            const { password: pass, ...rest } = user._doc
            res.send({ token, rest })
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = await User.create({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.image,
            });
            const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
            const { password: pass, ...rest } = newUser._doc;
            res
                .status(200)
                .send({ token, rest })
        }
    } catch (error) {
        console.log(error);
    }
}
