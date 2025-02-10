import dynamic from 'next/dynamic'
import Header from './_components/header'
import Footer from './_components/Footer'

const DialogModal = dynamic(() => import("@/components/modal/DialogModal"))
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'))
const Toaster = dynamic(() => import('@/components/ui/sonner'))

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[90px] min-h-[calc(100dvh-140px)] sm:mt-[110px]'>
                {children}
                <Toaster richColors position='top-right' />
                <AlertModal />
                <DialogModal />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout