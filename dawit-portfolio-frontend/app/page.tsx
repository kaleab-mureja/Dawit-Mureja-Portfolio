import About from "./about/page";
import News from "./news/page";
import Publications from "./publications/page";
import Awards from "./awards/page";
import Services from "./academic_services/page";
import Experiences from "./experience/page";

export default function Homepage() {
  return (
    <div className="flex flex-col justify-between item-center">
      <About />
      <News />
      <Publications />
      <Awards />
      <Experiences />
      <Services />
    </div>
  );
}
