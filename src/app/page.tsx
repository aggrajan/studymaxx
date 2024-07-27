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

      <BannerCarousal />
      <ExploreBooks />
      <DiscoverSection />
      <LatestArrivals />
      <OnlineSupport />
      <Testimonials />
      <FeedbackForm />
      <ContactQueryForm />
      <ConnectWithUs />

    </>
  );
}
