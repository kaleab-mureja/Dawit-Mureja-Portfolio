import Navbar from "@/components/header/Navbar";
import About from "./about/page";
import News from "./news/page";
import Publications from "./publications/page";
import Awards from "./awards/page";
import Services from "./academic_services/page";
import Experiences from "./experience/page";

export default function Homepage() {
  return (
    <main className="flex flex-col justify-between item-center">
      <Navbar />
      <section>
        <About />
        <News />
        <Publications />
        <Awards />
        <Experiences />
        <Services />
      </section>
    </main>
  );
}
