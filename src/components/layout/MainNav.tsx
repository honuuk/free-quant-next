'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/util/shadcn'
import { Sheet, SheetContent, SheetHeader } from '../ui/sheet'

const menus: { path: string; label: string }[] = [
  {
    path: '/screener',
    label: '포트폴리오 추출',
  },
]

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center justify-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <PCNav />
      <MobileNav />
    </nav>
  )
}

const PCNav = () => {
  const pathname = usePathname()

  const selected = (path: string) => {
    return pathname === path ? '' : 'text-muted-foreground'
  }

  return (
    <>
      <Link href="/" className="hidden md:block">
        <MountainIcon />
      </Link>
      {menus.map(({ path, label }) => (
        <Link
          key={label}
          href={path}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary hidden md:block',
            selected(path)
          )}
        >
          {label}
        </Link>
      ))}
    </>
  )
}

const MobileNav = () => {
  const [opened, setOpened] = useState<boolean>(false)
  const pathname = usePathname()

  const selected = (path: string) => {
    return pathname === path ? '' : 'text-muted-foreground'
  }

  return (
    <>
      <button className="block md:hidden" onClick={() => setOpened((prev) => !prev)}>
        <HamburgerIcon />
      </button>
      <Link href="/" className="absolute left-[calc(50%-12px)] !ml-0 block md:hidden">
        <MountainIcon />
      </Link>
      {opened && (
        <Sheet open onOpenChange={setOpened}>
          <SheetContent side="left">
            <SheetHeader>
              {menus.map(({ path, label }) => (
                <div key={label}>
                  <Link
                    key={label}
                    href={path}
                    onClick={() => setOpened(false)}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      selected(path)
                    )}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

const MountainIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
    </svg>
  )
}

const HamburgerIcon = () => {
  return (
    <svg
      data-id="5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  )
}
