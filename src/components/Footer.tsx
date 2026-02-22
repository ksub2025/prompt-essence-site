import { Link } from "react-router-dom";

const footerLinks = {
  Competition: [
    { label: "About Us", path: "/about" },
    { label: "Competition Structure", path: "/structure" },
    { label: "Pathways", path: "/subsections" },
    { label: "Timeline", path: "/timeline" },
  ],
  Participate: [
    { label: "Benefits", path: "/benefits" },
    { label: "Join Waitlist", path: "/waitlist" },
    
  ],
  Support: [
    { label: "FAQs", path: "/faqs" },
    { label: "Contact Us", path: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 mt-20">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display font-bold text-xl tracking-tight text-foreground">
              Venture Capsule
            </Link>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              A global business, finance and economics competition for students.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2026 Venture Capsule.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
