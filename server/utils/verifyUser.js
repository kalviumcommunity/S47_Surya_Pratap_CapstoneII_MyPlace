import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send("Authorisation header is missing")
        }
        const token1 = req.headers['authorization']
        const getToken = token1.split(' ')
        const accessToken = getToken[1]
        const vrifyUser = jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
            req.user = user
        })
        next()
    } catch (error) {
        res.status(401).send(error)
    }

}