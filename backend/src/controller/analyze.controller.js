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

export const upi_checker = async(req,res)=>{

    const {upi_id} = req.body;
    if(!upi_id || upi_id.trim() === ''){
        res.status(400).json({
            success:false,
            message:'UPI ID is required for this operation'
        })
        return;
    }

   try{
        const response = await axios.post(`${ml_service}/upi_checker`,{upi_id})

        res.status(200).json({
            success:true,
            res:response.data
        })
        return;
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'UPI model not working'
        })
        return;
        
    }
}

export const loan_app_checker = async(req,res)=>{

    const {appname} = req.body;
    console.log(typeof appname)

    if(!appname || appname.trim() === ''){
        res.status(400).json({
            success:false,
            message:'appName is required to check'
        })
        return;
    }

    try{


        const response = await axios.post(`${ml_service}/loanAppChecker`,{ appName: appname })

        if(!response.data){
            res.status(400).json({
                success:false,
                message:'No response from model'
            })
            return;
        }

        res.status(200).json({
            success:true,
            res:response.data
        })

    }catch(err){

        res.status(500).json({
            success:false,
            message:'Ml service not working'
        })
    }
}