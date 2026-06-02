import express from 'express';
import {prisma} from "@repo/db"

const app = express();

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
        await prisma.$transaction([
            prisma.balances.updateMany({
                where:{
                    userId: paymentInformation.userId
                },
                data:{
                    amount:{
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where:{
                    userId: paymentInformation.userId
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        
        return res.status(200).json({message:"captured"})
    } catch (error) {
        console.log(error);
        return res.status(411).json({message:"Error while processing webhook"})
    }
    
})