import { Card } from "@repo/ui/card"

const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        currency: "INR",
        style: "currency",
    }).format(amount / 100);

interface Transaction {
    type: "DEBIT" | "CREDIT";
    fromUser: {
        name: string | null;
        id: number;
        email: string | null;
    };
    toUser: {
        name: string | null;
        id: number;
        email: string | null;
    };
    id: number;
    amount: number;
    timeStamp: Date;
    fromUserId: number;
    toUserId: number;
}

interface OnWalletTransactionProps {
    transactions: Transaction[];
}

export const OnWalletTransaction = ({transactions}:OnWalletTransactionProps) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm text-slate-500">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="divide-y divide-slate-100">
            {transactions.map((t, index) => <div key={`${t.timeStamp.toISOString()}-${index}`} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                    <div className="text-sm font-medium text-slate-950">
                        {t.type === "DEBIT" ? `Sent to: ${t.toUser.name}` : `Received by: ${t.fromUser.name}`}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                        {t.timeStamp.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-sm font-semibold text ${t.type=="CREDIT" ? "text-emerald-600" : "text-red-600"}`}>{t.type =="CREDIT"? "+": "-"}{formatINR(t.amount)}</div>
                    <div className={`mt-1 text-xs font-medium ${t.type == "CREDIT" ? "text-emerald-400" : "text-red-400"}`}>
                        {t.type}
                    </div>
                </div>

            </div>)}
        </div>
    </Card>
}
