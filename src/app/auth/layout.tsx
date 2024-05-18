import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid w-full min-h-[100dvh] place-content-center">
      <div className="flex flex-col items-center">
        {children}
        <h1 className="text-center italic my-3 font-semibold">Feel free to use any credentials you&apos;d like. We prioritize your privacy and won&apos;t misuse your information. <br />
          It&apos;s just a side project to show potential employers and recruters to show my skills.</h1>
      </div>
    </section>
  )
}

export default AuthLayout