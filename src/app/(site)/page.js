import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <Hero />

        {/* Feature section */}
        <Feature />

        {/* Testimonials section */}
        <Testimonials />
      </main>
    </div>
  );
}
