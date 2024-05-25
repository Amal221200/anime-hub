import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'
import AlertModal from '@/components/modal/AlertModal'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[150px] min-h-[calc(100vh-160px)] sm:mt-[100px]'>
                {children}
                <AlertModal />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout