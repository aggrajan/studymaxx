import { BannerCarousal } from "@/components/component/banner-carousal";
import { ConnectWithUs } from "@/components/component/connect-with-us";
import { ContactQueryForm } from "@/components/component/contact-query-form";
import { DiscoverSection } from "@/components/component/discover-section";
import { ExploreBooks } from "@/components/component/explore-books";
import { FeedbackForm } from "@/components/component/feedback-form";
import { Footer } from "@/components/component/footer";
import { LatestArrivals } from "@/components/component/latest-arrivals";
import { NavBar } from "@/components/component/nav-bar";
import { OnlineSupport } from "@/components/component/online-support";
import { Testimonials } from "@/components/component/testimonials";

export default function Home() {
  
  return (
    <>
      <NavBar />
      <BannerCarousal />
      <ExploreBooks />
      <main className="flex-1">
        <DiscoverSection />
      </main>
      <LatestArrivals />
      <OnlineSupport />
      <Testimonials />
      <FeedbackForm />
      <ContactQueryForm />
      <ConnectWithUs />
      <Footer />
    </>
  );
}
