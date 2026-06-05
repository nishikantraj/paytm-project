"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [bank, setBank] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const parsedAmount = Math.round(Number(amount) * 100);
    const canSubmit = Boolean(bank && redirectUrl && Number.isFinite(parsedAmount) && parsedAmount >= 100 && !isSubmitting);

    return <Card title="Add Money">
    <div className="w-full space-y-5">
        <TextInput
            label="Amount"
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(value) => {
                setAmount(value);
                setError("");
            }}
        />
        <Select onSelect={(value) => {
            setBank(value);
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setError("");
        }} value={bank} label="Bank" options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        {error ? <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        <div>
            <Button
                className="w-full"
                disabled={!canSubmit}
                onClick={async () => {
                    try {
                        setIsSubmitting(true);
                        setError("");
                        const transaction = await createOnRampTransaction({
                            amount: parsedAmount,
                            provider: bank,
                        });
                        const url = new URL(redirectUrl || window.location.href);
                        url.searchParams.set("token", transaction.token);
                        url.searchParams.set("amount", String(parsedAmount));
                        window.location.href = url.toString();
                    } catch (e) {
                        setError(e instanceof Error ? e.message : "Unable to start this transfer.");
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
            >
            {isSubmitting ? "Starting transfer..." : "Add Money"}
            </Button>
            <p className="mt-3 text-xs leading-5 text-slate-500">
                Your request is saved before redirecting to the selected bank.
            </p>
        </div>
    </div>
</Card>
}
