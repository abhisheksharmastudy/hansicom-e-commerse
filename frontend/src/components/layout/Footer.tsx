import { ShieldCheck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded-md text-white">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-lg uppercase">FireGuard</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Leading the industry in premium fire safety equipment and services. 
              Protecting lives and assets since 1998.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products?cat=extinguishers" className="hover:text-primary">Fire Extinguishers</Link></li>
              <li><Link to="/products?cat=alarms" className="hover:text-primary">Alarm Systems</Link></li>
              <li><Link to="/products?cat=hydrants" className="hover:text-primary">Hydrant Systems</Link></li>
              <li><Link to="/products" className="hover:text-primary">Safety Signage</Link></li>
              <li><Link to="/products" className="hover:text-primary">Industrial Gear</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary">Our Services</Link></li>
              <li><Link to="/services" className="hover:text-primary">AMC Plans</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-primary">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact with Map */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Visit Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>123 Safety Boulevard,<br />Industrial Zone, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+91 (22) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>contact@fireguard.in</span>
              </li>
            </ul>
            {/* Map Embed */}
            <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.0812930944!2d72.74109976441773!3d19.082177512774066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1678900000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 FireGuard Safety Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
