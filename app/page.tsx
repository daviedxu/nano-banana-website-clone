import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Generator } from "@/components/generator"
import { Showcase } from "@/components/showcase"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Generator />
        <Features />
        <Showcase />
        <Testimonials />
        <FAQ />
      </main>
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Nano Banana is not related to Google or other AI companies.</p>
          <p className="mt-2">© 2025 Nano Banana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
