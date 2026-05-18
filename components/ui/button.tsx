'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#064E3B] text-white hover:bg-[#043B2C] active:scale-[0.98]',
  secondary:
    'bg-transparent text-[#064E3B] border border-[#064E3B] hover:bg-[#D1FAE5] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[#1A1A1A] hover:bg-[#F5F2EC] active:scale-[0.98]',
  danger:
    'bg-[#DC2626] text-white hover:bg-red-700 active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  loading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B]/30 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {asChild ? children : (
        <>
          {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
          {children}
        </>
      )}
    </Comp>
  )
}
