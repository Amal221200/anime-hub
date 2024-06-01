import dynamic from 'next/dynamic'
import Header from './_components/Header'
import Footer from './_components/Footer'
import ActionsProvider from '@/components/providers/ActionsProvider'
import { addAnimeReview, editAnimeReview, deleteAnimeReview, getAnimeReviews } from "@/lib/actions/anime-review";
import { addBlogReview, editBlogReview, deleteBlogReview, getBlogReviews } from "@/lib/actions/blog-review";
import { getAnimes } from '@/lib/actions/anime';
import { getBlogs } from '@/lib/actions/blog';
const DialogModal = dynamic(() => import("@/components/modal/DialogModal"), { ssr: false })
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner'), { ssr: false })

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ActionsProvider
            actions={{ addAnimeReview, addBlogReview, deleteAnimeReview, deleteBlogReview, editAnimeReview, editBlogReview, getAnimeReviews, getBlogReviews, getAnimes, getBlogs }}>
            <Header />
            <main className='mt-[100px] min-h-[calc(100vh-140px)]'>
                {children}
                <Toaster richColors position='top-right' />
                <AlertModal />
                <DialogModal />
            </main>
            <Footer />
        </ActionsProvider>
    )
}

export default MainLayout