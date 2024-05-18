"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { FormEvent, useCallback } from 'react';
import axios from "axios";


const SignUpPage = () => {

  const handleSubmit = useCallback(async (e: FormEvent) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const username = formData.get("username")?.toString()!
      const email = formData.get("email")?.toString()!
      const password = formData.get("password")?.toString()!

      await axios.post("/api/user", { username, email, password })

      await signIn('credentials', { username, password, callbackUrl: "/" })

    } catch (error: any) {
      console.log(error);
    }
  }, [])

  return (
    <main className="w-auth-width rounded-md border border-gray-500 p-4">
      <form className="flex flex-col gap-3 text-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-lg">Username</label>
          <input type="text" name="username" id="username" className="w-full rounded px-2 py-1 outline-none" placeholder="Username" required />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-lg">Email</label>
          <input type="email" name="email" id="email" className="w-full rounded px-2 py-1 outline-none" placeholder="Email" required />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-lg">Password</label>
          <input type="password" name="password" id="password" className="w-full rounded px-2 py-1 outline-none" placeholder="Password" required />
        </div>
        {/* <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-lg">Confirm Password</label>
          <input type="password" name="cpassword" id="cpassword" className="w-full rounded px-2 py-1 outline-none" placeholder="Confirm Password" required />
        </div> */}
        <button type="submit" className="rounded bg-slate-800 py-1 text-white transition hover:bg-zinc-950">Submit</button>
        <p className="text-center">
          Already have an account? <Link href="/auth/sign-in" className="text-blue-950 underline">Login</Link>
        </p>
      </form>
    </main>
  )
}

export default SignUpPage