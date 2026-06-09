import express from 'express';
import {prisma} from "@repo/db"

const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    return res.status(200).json({message:"ok"})
})
app.post('/hdfcWebHook',async(req, res)=>{
    
    const paymentInformation : {
        token: string,
        userId: number,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    
    try {
        const isProcessing = await prisma.onRampTransaction.findFirst({
            where:{
                token: paymentInformation.token
            },
            select:{
                status:true
            }
        })

        if(isProcessing?.status === "Processing"){
            await prisma.$transaction([
                prisma.balances.update({
                    where:{
                        userId: paymentInformation.userId
                    },
                    data:{
                        amount:{
                            increment: Number(paymentInformation.amount)
                        }
                    }
                }),
                prisma.onRampTransaction.update({
                    where:{
                        token: paymentInformation.token
                    },
                    data:{
                        status:"Success"
                    }
                })
            ]);
        }
        else{
            return res.status(422).json({message:"can't be captured"})
        }
        
        return res.status(200).json({message:"captured"})
    } catch (error) {
        console.log(error);
        return res.status(411).json({message:"Error while processing webhook"})
    }
    
})

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Webhook handler running on port ${PORT}`);
});