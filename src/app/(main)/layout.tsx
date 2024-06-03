import dynamic from 'next/dynamic'
import Header from './_components/Header'
import Footer from './_components/Footer'

const DialogModal = dynamic(() => import("@/components/modal/DialogModal"), { ssr: false })
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner'), { ssr: false })

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='mt-[100px] min-h-[calc(100vh-140px)]'>
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