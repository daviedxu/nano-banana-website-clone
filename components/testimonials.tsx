import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "AIArtistPro",
    role: "Digital Creator",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
    avatar: "AP",
  },
  {
    name: "ContentCreator",
    role: "UGC Specialist",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    avatar: "CC",
  },
  {
    name: "PhotoEditor",
    role: "Professional Editor",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    avatar: "PE",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">User Reviews</h2>
          <p className="text-xl text-muted-foreground">What creators are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
