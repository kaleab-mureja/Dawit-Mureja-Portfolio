import About from "./about/page";
import News from "./news/page";
import Publications from "./publications/page";
import Services from "./academic_services/page";
import Experiences from "./experience/page";

export default function page() {
  return (
    <div className="flex flex-col justify-between item-center">
      <About />
      <News />
      <Publications />
      <Services />
      <Experiences />
    </div>
  );
}
