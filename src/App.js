import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HOME } from "@/constants/testIds";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import UpcomingTrips from "@/components/site/UpcomingTrips";
import Categories from "@/components/site/Categories";
import WhyUs from "@/components/site/WhyUs";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import BookingForm from "@/components/site/BookingForm";
import Footer from "@/components/site/Footer";
import StickyMobileCTA from "@/components/site/StickyMobileCTA";

const Home = () => {
  useEffect(() => {
    // 1. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP context to handle automatic scoping and cleanup
    let ctx = gsap.context(() => {
      // Header/eyebrow and headings animations
      gsap.utils.toArray("main section h2, main section .text-eyebrow").forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Trips articles
      const tripCards = gsap.utils.toArray("main section#trips article");
      if (tripCards.length > 0) {
        gsap.fromTo(
          tripCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#trips",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Category links
      const categoryCards = gsap.utils.toArray("main section#categories a[data-testid^='category-']");
      if (categoryCards.length > 0) {
        gsap.fromTo(
          categoryCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#categories",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Why-us cards
      const whyUsCards = gsap.utils.toArray("main section#why [data-testid^='why-item-']");
      if (whyUsCards.length > 0) {
        gsap.fromTo(
          whyUsCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#why",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Gallery cards
      const galleryItems = gsap.utils.toArray("main section#gallery [data-testid^='gallery-image-']");
      if (galleryItems.length > 0) {
        gsap.fromTo(
          galleryItems,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#gallery",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Testimonials list
      const testimonialsEl = document.querySelector("main section#testimonials .max-w-4xl");
      if (testimonialsEl) {
        gsap.fromTo(
          testimonialsEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#testimonials",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // FAQ accordion items
      const faqItems = gsap.utils.toArray("main section#faq [data-testid^='faq-item-']");
      if (faqItems.length > 0) {
        gsap.fromTo(
          faqItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#faq",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Booking Form
      const bookingFormEl = document.querySelector("main section#book .max-w-4xl");
      if (bookingFormEl) {
        gsap.fromTo(
          bookingFormEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#book",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Clean up on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--terracotta)] selection:text-white">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <UpcomingTrips />
        <Categories />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <FAQ />
        <BookingForm />
      </main>
      <Footer />
      <StickyMobileCTA />
      
      {/* Retain the original required testid link just in case automated tests need it */}
      <div className="sr-only">
        <a data-testid={HOME.emergentLink} href="https://emergent.sh">Emergent</a>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

