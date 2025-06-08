// components/sidebar/sidebar-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'

const SidebarSkeleton = () => {
  return (
    <div className='bg-[#111111] p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
      {/* Logo Skeleton */}
      <div className='flex items-center gap-2 absolute top-0 left-0 right-0 p-4'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <Skeleton className='h-6 w-24' />
      </div>

      {/* Workspace Selector */}
      <Skeleton className='h-10 w-full mt-16' />

      {/* Invite Button Placeholder */}
      <div className='w-full flex items-center gap-2 bg-neutral-800/60 p-2 rounded-sm mt-2'>
        <PlusCircle size={15} className="text-neutral-600" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Menu Items */}
      <div className='w-full mt-4'>
        <Skeleton className='h-4 w-20 mb-2' />
        <ul className='space-y-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4 rounded-full' />
                <Skeleton className='h-4 w-32' />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Separator className='w-4/5 my-4' />

      {/* Workspaces Section */}
      <div className='w-full'>
        <Skeleton className='h-4 w-28 mb-2' />
        <ul className='space-y-2 max-h-[150px] overflow-hidden'>
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
                <Skeleton className='h-4 w-32' />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Separator className='w-4/5 my-4' />

      {/* Upgrade Card Placeholder */}
      <div className='w-full p-2'>
        <Skeleton className='h-20 w-full rounded-lg' />
      </div>
    </div>
  )
}

export default SidebarSkeleton
