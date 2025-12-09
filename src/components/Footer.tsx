import { Link } from "react-router-dom";
import { Bike, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero">
                <Bike className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Find<span className="text-primary">My</span>Bike
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A community-powered platform helping reunite bike owners with their stolen bikes through crowdsourced sightings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/report-stolen" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Stolen Bike
                </Link>
              </li>
              <li>
                <Link to="/report-sighting" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Sighting
                </Link>
              </li>
              <li>
                <Link to="/my-reports" className="text-muted-foreground hover:text-primary transition-colors">
                  My Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>help@findmybike.app</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FindMyBike. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for cyclists everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
