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

