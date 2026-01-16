import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "../ui/Section"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Robert Chen",
    role: "Operations Director, TechCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "FireGuard's equipment has been instrumental in achieving our safety compliance goals. The quality is exceptional and their support team is always responsive."
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Facility Manager, Industrial Park",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "We've been using their products for over 5 years now. Zero complaints, consistent quality, and the annual maintenance service is top-notch."
  },
  {
    id: 3,
    name: "David Kumar",
    role: "Safety Officer, Metro Hospital",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    quote: "In healthcare, safety is paramount. FireGuard understands this and delivers products that meet our stringent requirements every time."
  }
]

export default function Testimonials() {
  return (
    <Section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Background Particles/Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Join thousands of businesses that rely on FireGuard for their safety needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative group hover:bg-white/10 transition-colors"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-300 leading-relaxed mb-6 text-sm">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/50"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
