import { Section } from "../components/ui/Section"
import { motion } from "framer-motion"
import { Shield, Target, Building2, GraduationCap, Factory, Hospital, ArrowRight, CheckCircle2, Quote } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Link } from "react-router-dom"

// --- MOCK DATA ---
const TIMELINE = [
  { year: "1998", event: "Founded in Mumbai with a vision for fire safety excellence" },
  { year: "2005", event: "Achieved ISO 9001 Certification" },
  { year: "2010", event: "Expanded to Pan-India operations" },
  { year: "2015", event: "Launched Annual Maintenance Contract (AMC) division" },
  { year: "2020", event: "Awarded 'Best Fire Safety Provider' by Industry Association" },
  { year: "2024", event: "Serving 500+ corporate clients across India" },
]

const CERTIFICATIONS = [
  { name: "ISO 9001:2015", logo: "ISO", desc: "Quality Management" },
  { name: "ISI Mark", logo: "ISI", desc: "Bureau of Indian Standards" },
  { name: "MSME Registered", logo: "MSME", desc: "Govt. of India" },
  { name: "State Fire License", logo: "FL", desc: "Maharashtra State" },
  { name: "CE Marked", logo: "CE", desc: "European Conformity" },
]

const INDUSTRIES = [
  { icon: Hospital, name: "Hospitals & Healthcare" },
  { icon: GraduationCap, name: "Schools & Universities" },
  { icon: Factory, name: "Factories & Warehouses" },
  { icon: Building2, name: "Corporate Offices" },
]

const PROCESS_STEPS = [
  { step: 1, title: "Consultation", desc: "Free site survey & requirement analysis" },
  { step: 2, title: "Design", desc: "Custom system design & proposal" },
  { step: 3, title: "Installation", desc: "Professional installation by certified technicians" },
  { step: 4, title: "AMC Support", desc: "Ongoing maintenance & priority support" },
]

const TEAM = [
  { name: "Rajesh Sharma", role: "Lead Technician", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Patel", role: "Safety Engineer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Amit Singh", role: "Installation Head", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Sunita Rao", role: "AMC Manager", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face" },
]

const CLIENT_LOGOS = ["TechCorp", "IndustrialX", "MetroBuild", "SafetyFirst", "GlobeMall", "MediCare", "EduFirst", "RetailMax"]

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-neutral-900 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-heading font-bold mb-4 text-glow">
            About FireGuard
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protecting Lives & Assets Since 1998. India's Trusted Fire Safety Partner.
          </p>
        </div>
      </section>

      {/* Company History Timeline */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">Our Journey</h2>
          <p className="text-muted-foreground">25+ years of excellence in fire safety.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-muted-foreground text-sm">{item.event}</p>
                </div>
                <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm z-10">{item.year}</div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission Statement */}
      <Section className="bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Target className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-4xl font-heading font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To safeguard every life and property by providing world-class fire safety solutions that are accessible, reliable, and compliant with the highest standards. We believe safety is not a luxury—it's a fundamental right.
            </p>
            <ul className="space-y-3">
              {["Zero Compromise on Quality", "24/7 Customer Support", "Certified Professionals", "Transparent Pricing"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-green-500" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="aspect-video bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-600 font-bold text-2xl">Mission Video/Image</div>
        </div>
      </Section>

      {/* Founder Message */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-heading italic mb-8 text-foreground/90">
            "Every fire incident is preventable with the right equipment and awareness. Our mission is to ensure no life is lost to negligence."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" alt="Founder" className="h-16 w-16 rounded-full object-cover border-2 border-primary" />
            <div className="text-left">
              <h4 className="font-bold text-lg">Mr. Vikram Mehta</h4>
              <p className="text-muted-foreground text-sm">Founder & Managing Director</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Photos */}
      <Section className="bg-neutral-900/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">Our Expert Team</h2>
          <p className="text-muted-foreground">Certified professionals dedicated to your safety.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
              <img src={member.image} alt={member.name} className="h-32 w-32 mx-auto rounded-full object-cover mb-4 border-2 border-white/10" />
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Certifications Gallery */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">Certifications & Licenses</h2>
          <p className="text-muted-foreground">Compliant with national and international standards.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {CERTIFICATIONS.map(cert => (
            <div key={cert.name} className="text-center bg-neutral-900/50 rounded-xl p-6 border border-white/5 w-40">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary mb-3">{cert.logo}</div>
              <h4 className="font-bold text-sm">{cert.name}</h4>
              <p className="text-xs text-muted-foreground">{cert.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Process Diagram */}
      <Section className="bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">Our Process</h2>
          <p className="text-muted-foreground">From consultation to ongoing support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center relative">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 box-glow">{item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
              {i < PROCESS_STEPS.length - 1 && <ArrowRight className="hidden md:block absolute top-8 -right-4 text-primary/50 h-8 w-8" />}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Industries Served */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">Industries We Serve</h2>
          <p className="text-muted-foreground">Protecting diverse sectors with tailored solutions.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-neutral-900/50 rounded-xl p-6 text-center border border-white/5 hover:border-primary/30 transition-colors"
            >
              <ind.icon className="h-12 w-12 mx-auto text-primary mb-4" />
              <h4 className="font-bold">{ind.name}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Safety Policy Statement */}
      <Section className="bg-primary/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-3xl font-heading font-bold mb-4">Our Safety Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            FireGuard is committed to providing the highest level of fire protection through continuous training, quality products, and adherence to all regulatory standards. We ensure that every installation meets or exceeds National Building Code (NBC) requirements and local fire safety norms. Our goal is zero incidents through proactive prevention and rapid response capabilities.
          </p>
        </div>
      </Section>

      {/* Client Logos */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold">Our Client Portfolio</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {CLIENT_LOGOS.map(logo => (
            <div key={logo} className="px-6 py-3 bg-neutral-800 rounded-lg text-lg font-bold text-muted-foreground">{logo}</div>
          ))}
        </div>
      </Section>

      {/* Service Area Coverage Map */}
      <Section className="bg-neutral-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-4">Service Coverage</h2>
            <p className="text-muted-foreground mb-6">We provide installation and AMC services across major cities in India.</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {["Mumbai", "Delhi NCR", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Kolkata"].map(city => (
                <li key={city} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> {city}</li>
              ))}
            </ul>
            <Link to="/contact" className="inline-block mt-6"><Button variant="premium">Contact for Your City <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden border border-white/5">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60323976.96206147!2d65.17642399999999!3d22.04044445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1678900000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Coverage Map"
            ></iframe>
          </div>
        </div>
      </Section>
    </div>
  )
}
