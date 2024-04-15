



export const welcomeRoute = async (req, res) => {
    try {
        res.send({ message: "Hello World and you just found me" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

