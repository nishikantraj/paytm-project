import React, { type ReactNode } from "react";

export function Card({
  title,
  children,
  className
}: {
  title: string;
  children: ReactNode;
  className?: string
}) {
  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className={`mb-4 text-lg font-semibold text-slate-950 $ ${className || ""}`}>{title}</h2>
      {children}
    </section>
  );
}
