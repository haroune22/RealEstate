import express from "express"
import authRoute from "./routes/auth.route.js"

const app = express()
app.use(express.json())

app.use("/api/auth", authRoute)

app.listen(8800, ()=> {
    console.log("server listening on 8800")
})