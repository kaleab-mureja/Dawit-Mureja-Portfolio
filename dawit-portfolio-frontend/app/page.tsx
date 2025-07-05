import Navbar from "@/components/header/Navbar";
import About from "./about/page";
import News from "./education/page";
import Publications from "./publications/page";
import Awards from "./award/page";
import Services from "./service/page";
import Experiences from "./experience/page";
import Footer from "../components/footer/Footer";
export default function Homepage() {
  return (
    <main className="flex flex-col justify-between item-center">
      <Navbar />
      <section className="px-8 md:px-12">
        <About />
        <News />
        <Publications />
        <Awards />
        <Experiences />
        <Services />
      </section>
      <Footer />
    </main>
  );
}
