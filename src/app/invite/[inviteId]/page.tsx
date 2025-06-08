import { acceptInvite } from '@/actions/user'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{
    inviteId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { inviteId } = await params

  const invite = await acceptInvite(inviteId)

  if (invite?.status === 404) return redirect('/auth/sign-in')

  if (invite?.status === 401) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p className="text-white/70">You are not authorized to accept this invite.</p>
      </div>
    )
  }

  if (invite?.status === 200) {
    return (
      <div className="h-screen container flex flex-col justify-center items-center text-center gap-6">
        <div className="bg-green-100 border border-green-300 rounded-xl p-8 shadow-lg max-w-md">
          <h1 className="text-4xl font-bold text-green-800">Invite Accepted! 🎉</h1>
          <p className="mt-4 text-green-700">
            You've successfully accepted the invite. Click the button below to continue.
          </p>
          <Link href="/auth/callback">
            <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all">
              Continue
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // fallback (optional)
  return null
}

export default Page
