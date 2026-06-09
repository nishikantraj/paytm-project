
import { Card } from "@repo/ui/card";
import SendMoneyCard from "../../../components/SendMoneyCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { prisma } from "@repo/db";
import { OnWalletTransaction } from "../../../components/onWalletTransaction";


async function getWalletTransactions() {
    const session = await getServerSession(authOptions);

   const walletTransactions = await prisma.p2pTransaction.findMany({
        where: {
            OR: [
            {
                fromUserId: Number(session?.user?.id),
            },
            {
                toUserId: Number(session?.user?.id),
            },
            ],
        },
        include: {
            fromUser: {
            select: {
                id: true,
                name: true,
                email: true,
            },
            },
            toUser: {
            select: {
                id: true,
                name: true,
                email: true,
            },
            },
        },
        orderBy: {
            timeStamp: "desc",
        },
        take: 10,
    });

    const transactions = walletTransactions.map((tx) => ({
    ...tx,
    type: (tx.fromUserId === Number(session?.user?.id) ? "DEBIT" : "CREDIT") as "DEBIT" | "CREDIT",
    }));

    return transactions;
}

export default async function P2PTransfer(){
    const transactions = await getWalletTransactions();
    return (
        <div className="flex justify-around h-screen">
            <div className="w-md">
                <Card title="P2P Transaction" className="text-center">
                    <SendMoneyCard/>
                </Card>
            </div>
            <div>
                <OnWalletTransaction transactions={transactions}/>
            </div>
        </div>
    );
}