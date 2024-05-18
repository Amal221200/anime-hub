import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[100px]'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default MainLayout