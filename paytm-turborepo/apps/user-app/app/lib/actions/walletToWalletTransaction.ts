"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { prisma } from "@repo/db";
import { send } from "process";

type TransferResult = {
    success: boolean;
    message: string;
}

export default async function walletToWalletTransaction({amount, recipientNumber}:{amount:number, recipientNumber:string}): Promise<TransferResult>{
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id)
    if(!userId){
        return {
            success: false,
            message: "You must be logged in to transfer money.",
        };
    }


    try {
        if(!Number.isFinite(amount) || amount <= 0){
            return {
                success: false,
                message: "Enter a valid amount.",
            };
        }

        const recipentExist = await prisma.user.findFirst({
            where:{
                number: recipientNumber
            }
        });
        if(!recipentExist){
            return {
                success: false,
                message: "Recipient does not exist. Make sure the recipient has an account on Paytm.",
            };
        }

        if(recipentExist.id === userId){
            return {
                success: false,
                message: "You cannot transfer money to yourself.",
            };
        }

        const sender = await prisma.balances.findFirst({
            where:{
                userId: userId
            }
        });

        const senderBalance = sender?.amount ?? 0;
        if(senderBalance < amount){
            return {
                success: false,
                message: "You do not have sufficient balance.",
            };
        }

        await prisma.$transaction([
            prisma.balances.update({
                where:{
                    userId: recipentExist.id
                },
                data:{
                    amount:{
                        increment: amount
                    }
                }
            }),

            prisma.balances.update({
                where:{
                    userId: userId
                },
                data:{
                    amount:{
                        decrement: amount
                    }
                }
            }),

            prisma.p2pTransaction.create({
                data:{
                    amount,
                    timeStamp: new Date(),
                    fromUserId: userId,
                    toUserId: recipentExist.id
                }
            })
        ])

        return {
            success: true,
            message: "Transfer successful.",
        };

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to complete this transfer.",
        };
    }
}
