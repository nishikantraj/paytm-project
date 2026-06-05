import { Card } from "@repo/ui/card";

const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        currency: "INR",
        style: "currency",
    }).format(amount / 100);

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="mb-5 rounded-lg bg-slate-950 p-4 text-white">
            <div className="text-sm text-slate-300">Available balance</div>
            <div className="mt-2 text-3xl font-bold">{formatINR(amount)}</div>
        </div>
        <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b border-slate-100 pb-3">
            <div className="text-slate-600">
                Unlocked balance
            </div>
            <div className="font-semibold text-slate-950">
                {formatINR(amount)}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3">
            <div className="text-slate-600">
                Locked balance
            </div>
            <div className="font-semibold text-slate-950">
                {formatINR(locked)}
            </div>
        </div>
        <div className="flex justify-between">
            <div className="text-slate-600">
                Total Balance
            </div>
            <div className="font-semibold text-slate-950">
                {formatINR(locked + amount)}
            </div>
        </div>
        </div>
    </Card>
}
