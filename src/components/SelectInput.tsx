"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SelectInput({ placeholder, name, data, defaultValue }: { placeholder: string, name: string, data: Array<string>, defaultValue?: string }) {
    return (
        <Select name={name} defaultValue={defaultValue} >
            <SelectTrigger className="w-[180px] capitalize">
                <SelectValue placeholder={placeholder} className="outline-hidden" />
            </SelectTrigger>
            <SelectContent className="outline-hidden">
                <SelectGroup  className="outline-hidden">
                    <SelectItem value={'none'} className="capitalize opacity-80 outline-hidden">None</SelectItem>
                    {
                        data.map((value) => (
                            <SelectItem key={value} value={value} className="capitalize outline-hidden">{value}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
