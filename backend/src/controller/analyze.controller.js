import axios from "axios"

const ml_service = process.env.ML_SERVICE || "http://127.0.0.1:8000"


export const analyze = async(req,res)=>{

  
    const {message} = req.body;

    if(!message || message.trim() === ''){
        res.status(400).json({
            success:false,
            message:"Message is required"
        })
        return;
    }
    try{

        const response = await axios.post(`${ml_service}/analyze`,{message})
        res.status(200).json({
            success:true,
            result: response.data
        })
    }catch(err){

        console.log(err.message);
        res.status(500).json({
            success:false,
            message:"Ml service unavailable"
        })
    }
}