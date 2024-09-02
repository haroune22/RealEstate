import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();


const app = express()

app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoute)

app.listen(8800, ()=> {
    console.log("server listening on 8800")
})