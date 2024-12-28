import React from 'react';
import LandingPageNavBar from './_components/navbar';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-3 px-3 container'>
        <LandingPageNavBar />
        {children}
    </div>
  )
}

export default Layout;