import React, { useEffect } from 'react'
import { providers, signIn, getSession, csrfToken } from "next-auth/react";
import { useRouter } from 'next/router';

function signup() {
    const router = useRouter()
    async function getss() {
        const session = await getSession()
      

        if (session) {
            router.push('/')
        } else {
          //  setShowPage(true)
        }

    }
    useEffect(() => {
        getss()
    }, [])

  return (
    <div>signup</div>
  )
}

export default signup