import { redirect } from 'next/navigation'
import { completeSubscription } from '@/actions/user'

interface PageProps {
  searchParams?: {
    session_id?: string
    cancel?: string
  }
}

const Page = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const actualParams = await searchParams
  const { session_id, cancel } = actualParams

  if (session_id) {
    const customer = await completeSubscription(session_id)
    if (customer.status === 200) {
      return redirect('/auth/callback')
    }
  }

  if (cancel) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl text-center">Oops! Something went wrong</p>
      </div>
    )
  }

  return null // You must always return something
}

export default Page
