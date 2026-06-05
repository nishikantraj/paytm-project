import {prisma} from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { BalanceCard } from "../../../components/BalanceCard";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balances.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: "desc"
        },
        take: 5
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransfersPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="space-y-6">
        <div>
            <div className="text-sm font-medium text-slate-500">Wallet transfer</div>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">Add money</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Start a bank transfer, track its status, and keep your wallet balance in view.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-w-0">
                <AddMoney />
            </div>
            <div className="space-y-5">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}
