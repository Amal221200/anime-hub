"use client"
import React, { ReactNode } from 'react'

const Form = ({ heading, children }: { heading: string, children: ReactNode }) => {
    return (
        <form className="flex flex-col gap-3 text-center" >
            <h1 className="text-4xl font-bold">{heading}</h1>
            {children}
        </form>
    )
}

export default Form