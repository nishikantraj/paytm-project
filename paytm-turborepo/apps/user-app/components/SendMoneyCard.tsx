"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import walletToWalletTransaction from "../app/lib/actions/walletToWalletTransaction";

export default function SendMoneyCard(){
    const [mobileNumber, setMobileNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const parsedAmount = Math.round(Number(amount) * 100);
    const canSubmit = Boolean(mobileNumber && amount && Number.isFinite(parsedAmount) && parsedAmount > 0 && !isSubmitting)
    return (
        <div className="w-full space-y-5">
            <TextInput 
                placeholder="Recipient's number"
                label="Phone Number"
                type="number"
                value={mobileNumber}
                onChange={(value)=>{
                    setMobileNumber(value);
                    setError("");
                    setSuccess("");
                }}
            />

            <TextInput 
                placeholder="Amount"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e)=>{
                    setAmount(e);
                    setError("");
                    setSuccess("");
                }}
            />
            {error ? <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
            {success ? <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div> : null}

            <div>
                <Button 
                    className="w-full cursor-pointer"
                    disabled={!canSubmit}
                    onClick={async ()=>{
                        try {
                            setIsSubmitting(true)
                            setError("");
                            setSuccess("");
                            const transaction = await walletToWalletTransaction({
                                amount: parsedAmount,
                                recipientNumber: mobileNumber
                            });
                            if(!transaction.success){
                                setError(transaction.message);
                                return;
                            }
                            setSuccess(transaction.message);
                            setAmount("");
                            setMobileNumber("")
                        } catch (e) {
                            setError(e instanceof Error ? e.message : "Unable to start this transfer.");
                        }
                        finally{
                            setIsSubmitting(false)
                        }
                    }}
                >
                    {isSubmitting? "Starting transfer..." : "Transfer Money"}
                </Button>
            </div>
        </div>
    )
}
