import bcryptjs from "bcryptjs";
import { ValidateUser } from "../Validator/signup.Validator.js";
import User from "../models/user.model.js";

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
