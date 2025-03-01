import Intro from "./_components/Intro";
import HomeSectionLoading from "@/components/loading/HomeSectionLoading";
import { Suspense } from "react";
import HomeAnimeSection from "./_components/anime/HomeAnimeSection";
import HomeBlogSection from "./_components/blog/HomeBlogSection";

export default async function Home() {

  return (
    <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-120px)]">
      <Intro />
      <Suspense fallback={<HomeSectionLoading />}>
        <HomeAnimeSection />
      </Suspense>
      <Suspense fallback={<HomeSectionLoading />}>
        <HomeBlogSection />
      </Suspense>
    </div>
  );
}
