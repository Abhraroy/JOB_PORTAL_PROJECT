import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function jobPublisherSignin() {
  return (
    <>
    <div className='flex justify-center items-center h-screen w-screen'>
        <SignIn afterSignInUrl="/jobPublisher/profile" />
    </div>
    </>
  )
}

export default jobPublisherSignin