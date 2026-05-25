import HeroSection from '@/components/home/HeroSection';
import FeaturedTours from '@/components/home/FeaturedTours';
import DestinationCarousel from '@/components/home/DestinationCarousel';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import FAQSection from '@/components/home/FAQSection';
import DeveloperSection from '@/components/home/DeveloperSection';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <DestinationCarousel />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <FAQSection />
      <DeveloperSection />
      <CTABanner />
    </>
  );
}
