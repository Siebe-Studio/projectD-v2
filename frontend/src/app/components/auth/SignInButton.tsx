"use client";

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const SignInButton = () => {
    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <div>
                <p>hey {session.user.name}</p>
                <button onClick={() => signOut()}>uitlog</button>
            </div>
        )
    }

  return (
    <button onClick={() => signIn()}>inlog</button>
  )
}

export default SignInButton