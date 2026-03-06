import express from "express"
import Ml from "./routes/analyze.routes.js"
import cors from "cors"
const app = express();



app.use(cors())
app.use(express.json())


app.use("/api/v1",Ml);

export default app;