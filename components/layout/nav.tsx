'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Buy', href: '/listings?type=for_sale' },
  { label: 'Rent', href: '/listings?type=for_rent' },
  { label: 'Investors', href: '/listings?type=flip' },
  { label: 'Tools', href: '/tools' },
  { label: 'Directory', href: '/directory' },
  { label: 'Field Notes', href: '/field-notes' },
]

export function Nav() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]/50 h-16 flex items-center px-4 md:px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">

        {/* Wordmark */}
        <Link href="/" className="text-xl font-semibold text-[#064E3B] shrink-0">
          Haizer
        </Link>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#1A1A1A] rounded-md hover:bg-[#F5F2EC] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Link
                href="/listings/new"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#064E3B] px-3 py-1.5 rounded-full hover:bg-[#D1FAE5] transition-all duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                List for free
              </Link>

              {/* Avatar dropdown */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="w-9 h-9 rounded-full bg-[#064E3B] text-white text-sm font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30">
                    {user.email?.[0]?.toUpperCase() ?? 'U'}
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-white rounded-xl border border-[#E2E8F0] shadow-md p-1 z-50 mt-2"
                    align="end"
                    sideOffset={4}
                  >
                    {[
                      { label: 'Dashboard', href: '/dashboard' },
                      { label: 'My listings', href: '/dashboard/listings' },
                      { label: 'Saved listings', href: '/dashboard/saved' },
                      { label: 'Messages', href: '/dashboard/messages' },
                      { label: 'Settings', href: '/dashboard/settings' },
                    ].map((item) => (
                      <DropdownMenu.Item key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm text-[#1A1A1A] rounded-lg hover:bg-[#F5F2EC] cursor-pointer outline-none"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Separator className="my-1 h-px bg-[#E2E8F0]" />
                    <DropdownMenu.Item asChild>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-3 py-2 text-sm text-[#DC2626] rounded-lg hover:bg-[#F5F2EC] cursor-pointer outline-none"
                      >
                        Sign out
                      </button>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </>
          ) : (
            <>
              <Link
                href="/listings/new"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#064E3B] px-3 py-1.5 rounded-full hover:bg-[#D1FAE5] transition-all duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                List for free
              </Link>
              <Button asChild size="sm">
                <Link href="/signin">Sign in</Link>
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-[#F5F2EC]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen
                ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E2E8F0] px-4 py-3 flex flex-col gap-1 md:hidden shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F2EC] rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/listings/new"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 text-sm font-medium text-[#064E3B] hover:bg-[#F5F2EC] rounded-lg"
          >
            List for free
          </Link>
        </div>
      )}
    </nav>
  )
}
