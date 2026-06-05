"use client"
export const Select = ({ options, onSelect, label, value }: {
    onSelect: (value: string) => void;
    label?: string;
    value?: string;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <div className="space-y-2">
        {label ? <label className="block text-sm font-medium text-slate-700">{label}</label> : null}
        <select
            onChange={(e) => {
                onSelect(e.target.value)
            }}
            value={value}
            className="block min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        >
            {options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
        </select>
    </div>
}
