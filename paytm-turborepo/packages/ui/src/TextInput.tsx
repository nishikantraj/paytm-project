"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label,
    type = "text",
    value
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type?: "text" | "number" | "password" | "tel";
    value?: string;
}) => {
    return <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <input
            onChange={(e) => onChange(e.target.value)}
            type={type}
            value={value}
            className="block min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            placeholder={placeholder}
        />
    </div>
}
