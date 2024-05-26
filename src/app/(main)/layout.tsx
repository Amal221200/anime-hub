import { Suspense } from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'
import dynamic from 'next/dynamic'

const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/toaster'), { ssr: false })

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[150px] min-h-[calc(100vh-140px)] sm:mt-[100px]'>
                {children}
                <Suspense>
                    <Toaster />
                    <AlertModal />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export default MainLayout