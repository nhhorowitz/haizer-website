'use client'

import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#1A1A1A]"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={[
            'h-11 w-full rounded-[7px] border border-[#E2E8F0] bg-white px-4 text-base text-[#1A1A1A] placeholder:text-[#94A3B8] transition-colors',
            'focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20',
            'hover:border-[#CBD5E1]',
            'disabled:bg-[#F5F2EC] disabled:cursor-not-allowed',
            error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error ? (
          <p className="text-sm text-[#DC2626]">{error}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'
