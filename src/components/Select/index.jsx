import { cn } from "@/utils"
import { SelectStyle } from "./style"

export const Select = ({children,error,...props}) => {
    return (
        <SelectStyle {...props} pla onChange={ev => props?.onChange?.(ev.target.value)} className={cn('custom-select rounded-xl', {'border !border-[red] text-[red]': error})}>{children}</SelectStyle>
    )
}