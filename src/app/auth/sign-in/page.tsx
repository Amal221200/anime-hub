"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { FormEvent, useCallback } from 'react'

const SignInPage = () => {

  const handleSubmit = useCallback(async (e: FormEvent) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      await signIn('credentials', { username: formData.get('username'), password: formData.get('password'), callbackUrl: "/" })

    } catch (error: any) {
      console.log(error);
    }
  }, [])

  return (
    <main className="w-auth-width rounded-md border border-gray-500 p-4">
      <form className="flex flex-col gap-3 text-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold">Login</h1>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-lg">Username</label>
          <input type="text" name="username" id="username" className="w-full rounded px-2 py-1 outline-none" placeholder="Username" required />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-lg">Password</label>
          <input type="password" name="password" id="password" className="w-full rounded px-2 py-1 outline-none" placeholder="Password" required />
        </div>
        <button type="submit" className="rounded bg-slate-800 py-1 text-white transition hover:bg-zinc-950">Submit</button>
        <p className="text-center">{"Don't"} have an account? <Link href="/auth/sign-up" className="text-blue-950 underline">Sign Up</Link></p>
      </form>
    </main>
  )
}

export default SignInPage