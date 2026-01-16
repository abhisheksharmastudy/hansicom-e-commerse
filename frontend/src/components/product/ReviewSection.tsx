import { Star, ThumbsUp, User } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../ui/Button"

// Mock Data for Reviews
const REVIEWS = [
  {
    id: 1,
    author: "James Wilson",
    role: "Facility Manager",
    rating: 5,
    date: "2 days ago",
    title: "Exceptional build quality",
    content: "We installed these in our new warehouse facility. The mounting bracket is sturdy and the gauge is easy to read from a distance. Highly recommended for industrial use.",
    images: ["https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80", "https://images.unsplash.com/photo-1542013936693-884638332954?w=400&q=80"]
  },
  {
    id: 2,
    author: "Sarah Chen",
    role: "Safety Inspector",
    rating: 4,
    date: "1 week ago",
    title: "Compliant and reliable",
    content: "Passed all our safety inspections without issue. Documentation provided was very thorough. Only took off one star because shipping took an extra day.",
    images: []
  },
  {
    id: 3,
    author: "Mike Ross",
    role: "Business Owner",
    rating: 5,
    date: "2 weeks ago",
    title: "Great value for money",
    content: "Replaced all our old units with these. They look premium and give our staff confidence. The service team was also very helpful in determining how many we needed.",
    images: ["https://images.unsplash.com/photo-1517646133099-2d17c76891eb?w=400&q=80"]
  }
]

export default function ReviewSection({ productId: _productId }: { productId: string | undefined }) {
  return (
    <div className="space-y-12 py-12 border-t border-border/40">
      
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div>
           <h2 className="text-3xl font-heading font-bold mb-2">Customer Reviews</h2>
           <div className="flex items-center gap-4">
             <div className="flex text-yellow-500">
               {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
             </div>
             <span className="text-lg font-bold">4.8</span>
             <span className="text-muted-foreground">(124 verified ratings)</span>
           </div>
        </div>
        <Button variant="outline">Write a Review</Button>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-8">
        {REVIEWS.map((review, i) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                   <User className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm">{review.author}</h4>
                   <p className="text-xs text-muted-foreground">{review.role}</p>
                 </div>
               </div>
               <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>

            <div className="flex text-yellow-500 gap-0.5 mb-2">
               {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
            </div>

            <h5 className="font-bold mb-2">{review.title}</h5>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{review.content}</p>

            {/* User Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="Review attachment" 
                    className="h-16 w-16 object-cover rounded-md border border-border cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <ThumbsUp size={14} /> Helpful
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
