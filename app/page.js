import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import IconMarquee from "@/components/home/IconMarquee";
import Work from "@/components/home/Work";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import OffDuty from "@/components/home/OffDuty";
import Tools from "@/components/home/Tools";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-8">
      <Header />
      <Hero />
      <IconMarquee />
      <Work />
      <About />
      <Testimonials />
      <OffDuty />
      <Tools />
      <Footer />
    </main>
  );
}
