import { Section } from "../components/ui/Section"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { motion } from "framer-motion"
import { 
  Droplets, Bell, Flame, Shield, CheckCircle2, Phone, Calendar, FileText, 
  ChevronRight, MessageCircle, ClipboardCheck, ArrowRight, Download, HelpCircle, Loader2, AlertCircle
} from "lucide-react"
import { useState } from "react"
import { submitEnquiry } from "../lib/api"

// --- SERVICES DATA ---
const SERVICES = [
  { 
    icon: Droplets, 
    title: "Sprinkler Systems", 
    description: "Design, installation, and maintenance of automatic fire sprinkler systems for commercial and industrial facilities.",
    features: ["Wet & Dry Systems", "Pre-Action Systems", "Deluge Systems"]
  },
  { 
    icon: Flame, 
    title: "Fire Hydrant Systems", 
    description: "Complete hydrant network installation including underground piping, valve boxes, and connection points.",
    features: ["Internal Hydrants", "External Hydrants", "Hose Reel Systems"]
  },
  { 
    icon: Bell, 
    title: "Fire Alarm Systems", 
    description: "Intelligent detection and alarm systems including smoke detectors, heat sensors, and centralized monitoring.",
    features: ["Addressable Systems", "Conventional Systems", "Voice Evacuation"]
  },
  { 
    icon: Shield, 
    title: "Fire Safety Audits", 
    description: "Comprehensive safety audits to ensure your facility meets all national and local fire safety codes.",
    features: ["Gap Analysis", "Compliance Reports", "Risk Assessment"]
  },
]

const AMC_PACKAGES = [
  { name: "Basic", price: "₹29,999/yr", features: ["Bi-Annual Inspection", "24-Hour Response", "Parts Discount"], popular: false },
  { name: "Professional", price: "₹59,999/yr", features: ["Quarterly Inspection", "4-Hour Response", "Free Consumables", "Priority Support"], popular: true },
  { name: "Enterprise", price: "Custom", features: ["Monthly Inspection", "2-Hour Response", "Dedicated Manager", "Free Replacements", "Training"], popular: false },
]

const CERTIFICATIONS = [
  { name: "ISI Certified", logo: "ISI" },
  { name: "ISO 9001:2015", logo: "ISO" },
  { name: "NBC Compliant", logo: "NBC" },
  { name: "CE Marked", logo: "CE" },
]

const PORTFOLIO = [
  { title: "Corporate Tower A", category: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
  { title: "Mega Mall Central", category: "Retail", image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&h=300&fit=crop" },
  { title: "Industrial Plant X", category: "Industrial", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
  { title: "City Hospital", category: "Healthcare", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop" },
]

const CLIENT_LOGOS = ["TechCorp", "IndustrialX", "MetroBuild", "SafetyFirst", "GlobeMall", "MediCare"]

const INSTALLATION_STEPS = [
  { step: 1, title: "Site Survey", description: "Our experts assess your facility to understand your unique requirements." },
  { step: 2, title: "Custom Design", description: "We design a tailored fire safety system based on the survey findings." },
  { step: 3, title: "Installation", description: "Our certified technicians install the system with minimal disruption." },
  { step: 4, title: "Testing & Handover", description: "Rigorous testing is performed before final handover and training." },
]

const FAQS = [
  { q: "How often should fire equipment be serviced?", a: "As per NBC guidelines, fire extinguishers should be serviced annually, while suppression systems require quarterly checks." },
  { q: "Do you provide emergency call-out services?", a: "Yes, our AMC customers have access to 24/7 emergency support with guaranteed response times." },
  { q: "What certifications do your technicians hold?", a: "All our technicians are certified by the National Fire Academy and hold relevant ISI/ISO certifications." },
]

// --- COMPONENT ---
export default function Services() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
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
        source_page: "Services - Quote Request"
      })
      setSubmitResult({ success: true, message: result.message })
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setSubmitResult({ success: false, message: "Failed to submit. Please try again or call us directly." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-neutral-900 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6 text-glow"
          >
            Our Services
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive fire safety solutions from design to installation and ongoing maintenance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="premium" size="lg" onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <FileText className="mr-2 h-5 w-5" /> Request a Quote
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="mr-2 h-5 w-5" /> Book a Site Survey
            </Button>
          </div>
        </div>
      </section>

      {/* EMERGENCY HOTLINE BANNER */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-white">
          <Phone className="h-6 w-6 animate-pulse" />
          <span className="font-heading text-lg">24/7 Emergency Hotline:</span>
          <a href="tel:+1800555FIRE" className="text-2xl font-bold hover:underline">1-800-555-FIRE</a>
        </div>
      </div>

      {/* SERVICE CATEGORIES */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Equipment & Installation Categories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">From modern sprinkler systems to intelligent alarm networks, we cover it all.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map(f => (
                      <li key={f} className="text-xs flex items-center gap-2 text-foreground/80">
                        <CheckCircle2 className="h-3 w-3 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AMC PACKAGES */}
      <Section className="bg-neutral-900/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Annual Maintenance Contracts (AMC)</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose a plan that fits your needs. Ensure 24/7 protection and peace of mind.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {AMC_PACKAGES.map((pkg, i) => (
            <motion.div key={pkg.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className={`h-full relative ${pkg.popular ? 'border-primary ring-2 ring-primary/30' : ''}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-2">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={pkg.popular ? "premium" : "outline"} className="w-full">Choose {pkg.name}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold">Safety Compliance & Certifications</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {CERTIFICATIONS.map(cert => (
            <div key={cert.name} className="flex flex-col items-center gap-2 text-center">
              <div className="h-20 w-20 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-2xl font-bold text-primary">{cert.logo}</div>
              <span className="text-xs text-muted-foreground">{cert.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* INSTALLATION ROADMAP */}
      <Section className="bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Our Installation Process</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {INSTALLATION_STEPS.map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center relative">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 box-glow">{item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {i < INSTALLATION_STEPS.length - 1 && <ArrowRight className="hidden md:block absolute top-8 -right-4 text-primary/50 h-8 w-8" />}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECT PORTFOLIO */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Project Portfolio</h2>
          <p className="text-muted-foreground">A glimpse of our successful installations across diverse industries.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-xs text-primary font-medium">{project.category}</span>
                <h4 className="font-bold text-lg text-white">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS & CLIENT LOGOS */}
      <Section className="bg-neutral-900/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Trusted By Industry Leaders</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {CLIENT_LOGOS.map(logo => (
            <div key={logo} className="px-6 py-3 bg-neutral-800 rounded-lg text-lg font-bold text-muted-foreground">{logo}</div>
          ))}
        </div>
        {/* Could add actual testimonials here */}
      </Section>

      {/* QUOTE FORM & BROCHURE */}
      <Section id="quote-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Request a Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:border-primary outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" required className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:border-primary outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:border-primary outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder="Describe your requirements..." rows={4} className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:border-primary outline-none resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              
              {submitResult && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${submitResult.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {submitResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {submitResult.message}
                </div>
              )}
              
              <Button type="submit" variant="premium" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Request <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </form>
          </div>
          {/* Brochure & Audit Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><ClipboardCheck className="text-primary" /> Fire Safety Audit</h3>
                <p className="text-muted-foreground text-sm mb-4">A comprehensive audit includes risk identification, system evaluation, and a compliance report with actionable recommendations.</p>
                <Button variant="outline" className="w-full">Learn More About Audits</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Download className="text-primary" /> Download Brochures</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> Product Catalog 2026</a></li>
                  <li><a href="#" className="text-sm text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> AMC Service Guide</a></li>
                  <li><a href="#" className="text-sm text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> Compliance Checklist</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-neutral-900/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4"><HelpCircle className="inline h-8 w-8 mr-2 text-primary" />Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-neutral-800 rounded-lg border border-white/5 p-4">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-muted-foreground text-sm mt-3 pt-3 border-t border-white/5">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* LIVE CHAT WIDGET (Mock) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="premium" size="icon" className="h-14 w-14 rounded-full shadow-2xl box-glow">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
