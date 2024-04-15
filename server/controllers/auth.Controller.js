import bcryptjs from "bcryptjs";
import { ValidateUser } from "../Validator/signup.Validator.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    console.log(req.body)

    const { error, value } = ValidateUser(req.body)
    if (error) {
        console.log(error.details);
        res.send({ error: error.details })
    }
    const { userName, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {

        const newUser = await User.create({ userName: userName, email: email, password: hashedPassword })
        res.status(201).send({ "User creted": newUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}