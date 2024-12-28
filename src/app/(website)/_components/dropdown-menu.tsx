import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"]
  
const DropdownPaluMenu = () => {
    const path = usePathname()

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="w-8 h-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">

            <DropdownMenuItem>
            <Link
            href="/"
            className={cn(path === "/"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
            >
            Home
            </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
                <Link href="/pricing"
                    className={cn(path === "/pricing"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
                >
                    Pricing
                </Link>
            </DropdownMenuItem>
        
            <DropdownMenuItem>
                <Link href="/contact"
                    className={cn(path === "/contact"? "bg-[#7320DD] py-2 px-5 font-semibold rounded-full hover:bg-[#7320DD]/80" : "")}
                >
                    Contact
                </Link>
            </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

    );
};

export default DropdownPaluMenu;
