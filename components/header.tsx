import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-3xl">🍌</span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Nano Banana
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#generator" className="text-sm font-medium hover:text-primary transition-colors">
            Generator
          </Link>
          <Link href="#showcase" className="text-sm font-medium hover:text-primary transition-colors">
            Examples
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Reviews
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
          Start Editing
        </Button>
      </div>
    </header>
  )
}
