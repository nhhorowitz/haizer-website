'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  listingTitle: string
  listingId: string
}

export function ListingContact({ listingTitle, listingId }: Props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Hi, is this property still available?')
  const [sent, setSent] = useState(false)

  function handleSend() {
    // Will wire to messages table in Feature 7
    setSent(true)
    setTimeout(() => { setOpen(false); setSent(false) }, 1500)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="w-full h-12 bg-[#064E3B] text-white text-sm font-semibold rounded-full hover:bg-[#043B2C] transition-colors">
          Contact seller
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl z-50">
          <Dialog.Title className="text-lg font-semibold text-[#1A1A1A] mb-1">
            Contact seller
          </Dialog.Title>
          <p className="text-sm text-[#64748B] mb-5 line-clamp-1">{listingTitle}</p>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#064E3B" strokeWidth="2">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-[#1A1A1A]">Message sent</p>
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm text-[#1A1A1A] resize-none focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
              />
              <div className="flex gap-3 mt-4">
                <Dialog.Close asChild>
                  <button className="flex-1 h-11 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F5F2EC] transition-colors">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex-1 h-11 rounded-full bg-[#064E3B] text-white text-sm font-semibold hover:bg-[#043B2C] transition-colors disabled:opacity-40"
                >
                  Send message
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
