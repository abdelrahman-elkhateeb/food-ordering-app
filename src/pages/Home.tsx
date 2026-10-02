import FeaturedDishes from "@/components/home/FeaturedDishes";
import HomeCta from "@/components/home/HomeCta";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedDishes />
      <HowItWorks />
      <WhyUs />
      <HomeCta />
    </>
  );
}
