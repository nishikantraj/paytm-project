import { Card } from "@repo/ui/card";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getWalletSummary() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const [balance, transactions] = await Promise.all([
    prisma.balances.findFirst({
      where: { userId },
    }),
    prisma.onRampTransaction.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
      take: 4,
    }),
  ]);

  return {
    balance: {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    },
    transactions: transactions.map((transaction) => ({
      amount: transaction.amount,
      provider: transaction.provider,
      status: transaction.status,
      time: transaction.startTime,
    })),
  };
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if(!session?.user){
    return (
      <div>
        user not logged it
      </div>
    )
  }
  const { balance, transactions } = await getWalletSummary();
  const successful = transactions.filter((transaction) => transaction.status === "Success").length;
  const processing = transactions.filter((transaction) => transaction.status === "Processing").length;

  return <div className="space-y-6">
    <div>
      <div className="text-sm font-medium text-slate-500">Overview</div>
      <h1 className="mt-1 text-3xl font-bold text-slate-950">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Your wallet balance, recent activity, and transfer status in one place.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card title="Total requests">
        <div className="text-3xl font-bold text-slate-950">{transactions.length}</div>
        <div className="mt-1 text-sm text-slate-500">Recent add-money attempts</div>
      </Card>
      <Card title="Successful">
        <div className="text-3xl font-bold text-emerald-600">{successful}</div>
        <div className="mt-1 text-sm text-slate-500">Completed bank credits</div>
      </Card>
      <Card title="Processing">
        <div className="text-3xl font-bold text-amber-600">{processing}</div>
        <div className="mt-1 text-sm text-slate-500">Waiting for bank callback</div>
      </Card>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[420px_minmax(0,1fr)]">
      <BalanceCard amount={balance.amount} locked={balance.locked} />
      <OnRampTransactions transactions={transactions} />
    </div>
  </div>;
}
