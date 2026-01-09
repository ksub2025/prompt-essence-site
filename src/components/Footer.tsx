import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-foreground">
            Venture Capsule
          </Link>
          <p className="text-muted-foreground text-sm">
            © 2026 Venture Capsule. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
