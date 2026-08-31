'use client'
import { useEffect, useEffectEvent, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from '@/shared/ui'

export const SidebarToggle = () => {
  const checkboxRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  const handleOpenClick = () => {
    if (checkboxRef.current) checkboxRef.current.checked = true
  }
  const handleKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.code === 'Escape' && checkboxRef.current)
      checkboxRef.current.checked = false
  })

  useEffect(() => {
    if (checkboxRef.current) checkboxRef.current.checked = false
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [pathname])

  return (
    <>
      <input
        type="checkbox"
        id="sidebar-toggle"
        className="peer hidden"
        ref={checkboxRef}
      />

      <label
        htmlFor="sidebar-toggle"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-black/40 opacity-0 transition-opacity duration-300 ease-in-out peer-checked:pointer-events-auto peer-checked:opacity-100 lg:hidden"
      />

      <button
        type="button"
        aria-label="Open menu"
        className="fixed top-1/2 left-0 z-30 h-16 w-6 -translate-y-1/2 cursor-pointer rounded-r-lg border border-white/10 bg-sidebar-bg text-white transition-all duration-300 ease-in-out peer-checked:-translate-x-full peer-checked:opacity-0 lg:hidden"
        onClick={handleOpenClick}
      >
        <Icon
          size={20}
          name="chevron-right"
          className="m-auto"
        />
      </button>
    </>
  )
}
