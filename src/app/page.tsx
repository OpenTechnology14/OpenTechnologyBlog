import TechBullets from "@/components/TechBullets";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 py-12">
          <div className="mb-10 max-w-lg mx-auto">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-2">
              Open Technology
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Exploring the open-source ecosystem — tools, frameworks, and infrastructure
              for building modern applications without vendor lock-in.
            </p>
          </div>

          <div className="mb-16">
            <TechBullets />
          </div>

          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
