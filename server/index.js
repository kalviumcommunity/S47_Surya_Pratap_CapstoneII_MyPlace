import expres from "express"

const app = expres()


app.listen(300, () => {
    console.log("Server is running at port 300");
})