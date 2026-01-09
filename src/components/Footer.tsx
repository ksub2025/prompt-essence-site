import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-20">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display font-bold text-xl tracking-tight">
            <span className="gradient-text">IGNITE</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            © 2026 IGNITE Competition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
