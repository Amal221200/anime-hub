import dynamic from "next/dynamic";
import Intro from "./_components/Intro";
import HomeSectionLoading from "@/components/loading/HomeSectionLoading";

const HomeAnimeSection = dynamic(() => import('./_components/anime/HomeAnimeSection'), { loading: () => <HomeSectionLoading />, ssr: true })

const HomeBlogSection = dynamic(() => import('./_components/blog/HomeBlogSection'), { loading: () => <HomeSectionLoading />, ssr: true })

export default async function Home() {

  return (
    <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-120px)]">
      <Intro />
      <HomeAnimeSection />
      <HomeBlogSection />
    </div>
  );
}
