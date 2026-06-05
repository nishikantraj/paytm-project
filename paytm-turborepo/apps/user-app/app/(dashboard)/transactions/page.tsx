import { Card } from "@repo/ui/card";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(amount / 100);

async function getTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return transactions.map((transaction) => ({
    amount: transaction.amount,
    provider: transaction.provider,
    status: transaction.status,
    time: transaction.startTime,
    token: transaction.token,
  }));
}

export default async function Transactions() {
  const transactions = await getTransactions();

  return <div className="space-y-6">
    <div>
      <div className="text-sm font-medium text-slate-500">Activity</div>
      <h1 className="mt-1 text-3xl font-bold text-slate-950">Transactions</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Review every add-money request and its current bank processing status.
      </p>
    </div>

    <Card title="All transactions">
      {transactions.length ? <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
          <div>Provider</div>
          <div>Date</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="divide-y divide-slate-100">
          {transactions.map((transaction) => <div key={transaction.token} className="grid gap-3 px-4 py-4 text-sm md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center">
            <div>
              <div className="font-semibold text-slate-950">{transaction.provider}</div>
              <div className="mt-1 truncate text-xs text-slate-500">{transaction.token}</div>
            </div>
            <div className="text-slate-600">
              {transaction.time.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className={`font-semibold ${transaction.status === "Success" ? "text-emerald-600" : transaction.status === "Failure" ? "text-red-600" : "text-amber-600"}`}>
              {transaction.status}
            </div>
            <div className="font-semibold text-slate-950 md:text-right">+ {formatINR(transaction.amount)}</div>
          </div>)}
        </div>
      </div> : <div className="rounded-lg border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">
        No transactions yet.
      </div>}
    </Card>
  </div>;
}
