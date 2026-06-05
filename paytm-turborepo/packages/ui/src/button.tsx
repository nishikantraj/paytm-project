"use client";

import React, { type ButtonHTMLAttributes, type JSX, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

export const Button = ({
    children,
    className = "",
    disabled,
    variant = "primary",
    ...props
}: ButtonProps): JSX.Element => {
    const variantClass =
        variant === "primary"
            ? "bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-200"
            : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-200";

    return (
        <button
            className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
            disabled={disabled}
            type="button"
            {...props}
        >
            {children}
        </button>
    );
}
