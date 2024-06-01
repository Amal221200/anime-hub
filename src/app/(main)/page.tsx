import dynamic from "next/dynamic";
import Intro from "./_components/Intro";
import SectionLoading from "@/components/loading/SectionLoading";

const HomeAnimeSection = dynamic(() => import('@/components/loading/SectionLoading'), { loading: () => <SectionLoading />, ssr: true })

const HomeBlogSection = dynamic(() => import('@/components/loading/SectionLoading'), { loading: () => <SectionLoading />, ssr: true })

export default async function Home() {

  return (
    <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-120px)]">
      <Intro />
      <HomeAnimeSection />
      <HomeBlogSection />
    </div>
  );
}
