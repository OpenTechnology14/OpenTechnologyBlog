import TechBullets from "@/components/TechBullets";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrap from "@/components/PageWrap";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageWrap className="py-12 flex flex-col items-center">
          <div className="mb-10 max-w-lg text-center">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-2">
              Open Technology
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Exploring the open-source ecosystem — tools, frameworks, and infrastructure
              for building modern applications without vendor lock-in.
            </p>
          </div>

          <div className="mb-16 w-full">
            <TechBullets />
          </div>

          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </PageWrap>
      </main>
      <Footer />
    </div>
  );
}
