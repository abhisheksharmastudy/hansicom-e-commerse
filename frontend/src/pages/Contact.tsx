import { useState } from "react"
import { Section } from "../components/ui/Section"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, AlertTriangle, 
  Facebook, Linkedin, Instagram, Twitter, ChevronRight, CheckCircle2, Loader2
} from "lucide-react"
import { submitEnquiry } from "../lib/api"

// --- MOCK DATA ---
const DEPARTMENTS = [
  { name: "Sales Enquiries", email: "sales@fireguard.in", phone: "+91 22 1234 5001" },
  { name: "Customer Support", email: "support@fireguard.in", phone: "+91 22 1234 5002" },
  { name: "Accounts & Billing", email: "accounts@fireguard.in", phone: "+91 22 1234 5003" },
  { name: "Grievance Redressal", email: "grievance@fireguard.in", phone: "+91 22 1234 5099" },
]

const OPERATING_HOURS = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed (Emergency: 24/7)" },
]

// --- COMPONENT ---
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", message: "" })
  const [pincode, setPincode] = useState("")
  const [pincodeResult, setPincodeResult] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.message,
        source_page: "Contact - Site Visit Request"
      })
      setSubmitResult({ success: true, message: result.message })
      setFormData({ name: "", email: "", phone: "", date: "", message: "" })
    } catch (error) {
      setSubmitResult({ success: false, message: "Failed to submit. Please try again or call us directly." })
    } finally {
      setSubmitting(false)
    }
  }

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeResult("✓ We provide services in this area!")
    } else {
      setPincodeResult("Please enter a valid 6-digit pincode")
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-neutral-900 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-heading font-bold mb-4 text-glow">
            Contact Us
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            We're here to help. Reach out for sales, support, or emergencies.
          </p>
        </div>
      </section>

      {/* Emergency Hotline Banner */}
      <div className="bg-red-600 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-white">
          <AlertTriangle className="h-6 w-6 animate-pulse" />
          <span className="font-heading text-lg">24/7 Emergency Helpline:</span>
          <a href="tel:+911800555FIRE" className="text-3xl font-bold hover:underline">1800-555-FIRE</a>
        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full h-[400px] bg-neutral-800">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755508556035!2d72.8560244!3d19.0531218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123456789%3A0xabcdef1234567890!2sFire%20Safety%20Building!5e0!3m2!1sen!2sin!4v1678900000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Column */}
          <div className="space-y-8">
            {/* Physical Address */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Head Office</h3>
                  <address className="not-italic text-muted-foreground leading-relaxed">
                    FireGuard Safety Solutions Pvt. Ltd.<br />
                    Unit 401-405, Safety Tower,<br />
                    Andheri-Kurla Road, Andheri East,<br />
                    Mumbai, Maharashtra 400069, India
                  </address>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-3">Phone Numbers</h3>
                  <div className="space-y-2">
                    <a href="tel:+912212345678" className="flex justify-between items-center text-muted-foreground hover:text-primary">
                      <span>Main Office</span> <span className="font-mono">+91 22 1234 5678</span>
                    </a>
                    <a href="tel:+919876543210" className="flex justify-between items-center text-muted-foreground hover:text-primary">
                      <span>Sales Direct</span> <span className="font-mono">+91 98765 43210</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Emails */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-3">Department Contacts</h3>
                  <div className="space-y-3">
                    {DEPARTMENTS.map(dept => (
                      <div key={dept.email} className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <a href={`mailto:${dept.email}`} className="text-sm text-primary hover:underline">{dept.email}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-3">Operating Hours</h3>
                  <div className="space-y-2">
                    {OPERATING_HOURS.map(item => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow Us:</span>
              {[
                { icon: Facebook, href: "https://facebook.com/fireguard" },
                { icon: Linkedin, href: "https://linkedin.com/company/fireguard" },
                { icon: Instagram, href: "https://instagram.com/fireguard" },
                { icon: Twitter, href: "https://twitter.com/fireguard" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-neutral-800 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="space-y-8">
            {/* Site Visit Form */}
            <div className="bg-neutral-900/50 rounded-xl p-8 border border-white/5">
              <h2 className="text-2xl font-heading font-bold mb-6">Request a Site Visit</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" placeholder="Your Name *" required 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="email" placeholder="Email Address *" required 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
                  />
                  <input 
                    type="tel" placeholder="Phone Number *" required 
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
                  />
                </div>
                <input 
                  type="date" placeholder="Preferred Visit Date" 
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none text-muted-foreground"
                />
                <textarea 
                  placeholder="Tell us about your requirements..." rows={4}
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none resize-none"
                />
                
                {submitResult && (
                  <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${submitResult.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {submitResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    {submitResult.message}
                  </div>
                )}
                
                <Button type="submit" variant="premium" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
                  ) : (
                    <>Request Site Visit <ChevronRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </form>
            </div>

            {/* Pincode Checker */}
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/5">
              <h3 className="font-bold text-lg mb-4">Check Service Availability</h3>
              <div className="flex gap-3">
                <input 
                  type="text" placeholder="Enter Pincode" 
                  value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary outline-none"
                />
                <Button variant="secondary" onClick={checkPincode}>Check</Button>
              </div>
              {pincodeResult && (
                <p className={`mt-3 text-sm flex items-center gap-2 ${pincodeResult.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                  <CheckCircle2 className="h-4 w-4" /> {pincodeResult}
                </p>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/919876543210?text=Hi, I'd like to inquire about fire safety solutions." 
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-green-600 rounded-xl text-white font-bold hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </Section>

      {/* Grievance Redressal Section */}
      <Section className="bg-neutral-900/50 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <AlertTriangle className="h-10 w-10 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-heading font-bold mb-2">Grievance Redressal</h2>
          <p className="text-muted-foreground mb-4">
            If you have any complaints or unresolved issues, please contact our Grievance Officer directly.
          </p>
          <div className="bg-neutral-800 rounded-lg p-4 inline-block">
            <p className="font-medium">Mr. Sanjay Verma - Grievance Officer</p>
            <p className="text-sm text-muted-foreground">Email: <a href="mailto:grievance@fireguard.in" className="text-primary hover:underline">grievance@fireguard.in</a></p>
            <p className="text-sm text-muted-foreground">Phone: <a href="tel:+912212345099" className="text-primary hover:underline">+91 22 1234 5099</a></p>
          </div>
        </div>
      </Section>
    </div>
  )
}
