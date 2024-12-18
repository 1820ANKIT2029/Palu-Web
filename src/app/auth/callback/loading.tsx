import { Spinner } from '@/components/global/loader/spinner'
import React from 'react'

type Props = {}

function AuthLoading({}: Props) {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
        <Spinner />
    </div>
  )
}

export default AuthLoading