import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid min-h-[100dvh] w-full place-content-center">
      {children}
    </section>
  )
}

export default AuthLayout