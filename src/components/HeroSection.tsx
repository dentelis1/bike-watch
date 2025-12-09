import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Camera, ArrowRight, Shield, Users, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
            <Shield className="h-4 w-4" />
            Community-powered bike recovery
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Lost Your Bike?{" "}
            <span className="text-gradient-hero">We'll Help You Find It</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Report stolen bikes, share sightings, and tap into the power of community to recover what's yours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/report-stolen">
              <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                <AlertTriangle className="h-5 w-5" />
                Report Stolen Bike
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/report-sighting">
              <Button variant="outline" size="xl" className="w-full sm:w-auto group">
                <Camera className="h-5 w-5" />
                Spotted a Bike?
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Users, label: "Community Members", value: "10,000+" },
            { icon: MapPin, label: "Bikes Reported", value: "5,200+" },
            { icon: Shield, label: "Bikes Recovered", value: "1,800+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-6 rounded-2xl bg-card shadow-md border border-border/50 animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
