import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    image: "/mountain-landscape-digital-art.jpg",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    image: "/beautiful-garden-flowers.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    image: "/tropical-beach-sunset.png",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    image: "/northern-lights-aurora.png",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Showcase</h2>
          <p className="text-xl text-muted-foreground">Lightning-Fast AI Creations</p>
          <p className="text-muted-foreground mt-2">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-black hover:bg-yellow-600">
                  Nano Banana Speed
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">Experience the power of Nano Banana yourself</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
          >
            Try Nano Banana Generator
          </Button>
        </div>
      </div>
    </section>
  )
}
