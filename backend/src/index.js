import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()


const PORT = process.env.PORT || 3001;



app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"wrongNumber backend is running"
    })
})



app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

