import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";

export const welcomeRoute = async (req, res) => {
    try {
        res.send({ message: "Hello World and you just found me" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params
    if (req.user.id !== id) {
        return res.send({ message: "You can only update your own account" })
    }
    try {

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: id }, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc
        res.status(200).json({ "rest": rest })
    } catch (error) {
        res.send(error)
    }
}