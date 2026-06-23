import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Experience from "@/app/components/sections/Experience";
import Projects from "@/app/components/sections/Projects";
import Skills from "@/app/components/sections/Skills";
import Featured from "@/app/components/sections/Featured";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Featured />
      <Contact />
    </main>
  );
}
