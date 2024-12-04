import Buy from "./components/Buy";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Overview from "./components/Overview";

export default async function Home() {
  return (
    <div className="w-full overflow-hidden">
      <main className="">
        <Hero />
        <Overview />
        <Features />
        <Buy />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
