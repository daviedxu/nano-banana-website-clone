import { Card } from "@/components/ui/card"
import { Zap, Users, ImageIcon, Sparkles, Layers, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Natural Language Editing",
    description:
      "Edit images using simple text prompts. Nano-banana AI understands complex instructions like GPT for images",
  },
  {
    icon: Users,
    title: "Character Consistency",
    description:
      "Maintain perfect character details across edits. This model excels at preserving faces and identities",
  },
  {
    icon: ImageIcon,
    title: "Scene Preservation",
    description: "Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext",
  },
  {
    icon: Sparkles,
    title: "One-Shot Editing",
    description:
      "Perfect results in a single attempt. Nano-banana solves one-shot image editing challenges effortlessly",
  },
  {
    icon: Layers,
    title: "Multi-Image Context",
    description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows",
  },
  {
    icon: TrendingUp,
    title: "AI UGC Creation",
    description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-muted-foreground">Why Choose Nano Banana?</p>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            Nano-banana is the most advanced AI image editor on LMArena. Revolutionize your photo editing with natural
            language understanding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
              <feature.icon className="w-12 h-12 mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
