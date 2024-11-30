import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add optional props for future extensibility
  variant?: 'default' | 'ghost'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-xl transition-all duration-200",
          variant === 'default' && "px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400",
          variant === 'ghost' && "bg-transparent border-transparent text-white placeholder-gray-400",
          "focus:border-yellow-300 focus:ring-yellow-300",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }