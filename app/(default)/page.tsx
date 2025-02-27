import { Hero } from '@/components/Hero';
import { BookingForm } from '@/components/ui/BookingForm';
import { WhyChooseUs } from '@/components/ui/WhyChooseUs';
import { WhyChooseUsMobile } from '@/components/mobile/WhyChooseUsMobile';
import { Testimonials } from '@/components/ui/Testimonials';
import ServiceTabs from '@/components/services/ServiceTabs';
import { BrandCarousel } from '@/components/ui/BrandCarousel';
import { FAQ } from '@/components/ui/FAQ';
import { InstagramFeed } from '@/components/ui/InstagramFeed';
import { SparklesCore } from '@/components/ui/SparklesCore';
import type { Metadata } from 'next';
import { ClientOnly } from '@/components/ui/ClientOnly';

export const metadata: Metadata = {
  title: 'Brisbane 24/7 Emergency Repairs & Installations',
  description: 'Professional plumbing, gas, roofing & air conditioning services. Fast response. Fair pricing. Guaranteed satisfaction.',
};

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <ServiceTabs />

      {/* Why Choose Us Section - Conditionally rendered for mobile/desktop */}
      <ClientOnly>
        <>
          <div className="hidden md:block">
            <WhyChooseUs />
          </div>
          <div className="block md:hidden">
            <WhyChooseUsMobile />
          </div>
        </>
      </ClientOnly>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      <BrandCarousel />
      <InstagramFeed />
      
      {/* Booking Section */}
      <section id="book" className="relative bg-black py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage-booking"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#1CD4A7"
            speed={0.2}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Book Your Service
            </h2>
            <p className="text-lg text-gray-300">
              Fill out the form below to schedule your service. We'll get back to you promptly to confirm your appointment.
            </p>
          </div>
          
          <BookingForm />
          
          <div className="mt-16">
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}
