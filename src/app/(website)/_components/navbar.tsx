'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'
import DropdownPaluMenu from './dropdown-menu'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  const path = usePathname()

  // console.log(path)

  return (
    <div className="flex w-full justify-between items-center bg-color2 p-3 rounded-sm">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <div className='lg:hidden'>
          <DropdownPaluMenu />
        </div>
        <Image
          alt="logo"
          src="/palu-logo.svg"
          width={40}
          height={40}
        />
        <span className='hidden lg:flex'>
          Palu
        </span>
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className={cn(path === "/"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
        >
          Home
        </Link>
        <Link href="/pricing"
          className={cn(path === "/pricing"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
        >
          Pricing
        </Link>
        <Link href="/contact"
          className={cn(path === "/contact"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
        >
          Contact
        </Link>
      </div>
      <div className='flex gap-3 items-center'>
        <Link href="/auth/sign-in">
          <Button className="text-base flex gap-x-2">
            <User fill="#000" />
            Sign-up
          </Button>
        </Link>
        <Link href="/auth/sign-in">
          <Button className="text-base flex gap-x-2">
            <User fill="#000" />
            Login
          </Button>
        </Link>
      </div>
     
    </div>
  )
}

export default LandingPageNavBar