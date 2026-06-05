import { Card } from "@repo/ui/card"

const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        currency: "INR",
        style: "currency",
    }).format(amount / 100);

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm text-slate-500">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="divide-y divide-slate-100">
            {transactions.map((t, index) => <div key={`${t.provider}-${t.time.toISOString()}-${index}`} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                    <div className="text-sm font-medium text-slate-950">
                        {t.status === "Success" ? "Received money" : "Add money request"}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                        {t.provider} - {t.time.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-semibold text-slate-950">+ {formatINR(t.amount)}</div>
                    <div className={`mt-1 text-xs font-medium ${t.status === "Success" ? "text-emerald-600" : t.status === "Failure" ? "text-red-600" : "text-amber-600"}`}>
                        {t.status}
                    </div>
                </div>

            </div>)}
        </div>
    </Card>
}
