import { Suspense } from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'
import dynamic from 'next/dynamic'

const DialogModal = dynamic(() => import("@/components/modal/DialogModal"), { ssr: false })
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner'), { ssr: false })

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[150px] min-h-[calc(100vh-140px)] sm:mt-[100px]'>
                {children}
                <Suspense>
                    <Toaster richColors position='top-right' />
                    <AlertModal />
                    <DialogModal />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export default MainLayout