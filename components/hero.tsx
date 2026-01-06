import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 text-8xl opacity-5 rotate-12">🍌</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-5 -rotate-12">🍌</div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6">
          <span className="text-sm font-medium">NEW</span>
          <span className="text-sm text-muted-foreground">Nano Banana Pro is now live</span>
          <Link href="#generator" className="text-sm font-medium text-primary hover:underline">
            Try it now →
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
          <span className="text-2xl">🍌</span>
          <span className="text-sm font-medium">The AI model that outperforms Flux Kontext</span>
          <Link href="#generator" className="text-sm font-medium text-primary hover:underline">
            Try Now →
          </Link>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">Nano Banana</h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
          Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold text-lg px-8"
          >
            Start Editing
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
            View Examples
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Multi-image support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Natural language</span>
          </div>
        </div>
      </div>
    </section>
  )
}
