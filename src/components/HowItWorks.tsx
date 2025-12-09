import { Camera, Upload, Bell, Search } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Report Your Bike",
      description: "Upload photos and details of your stolen bike to our database.",
      color: "bg-primary",
    },
    {
      icon: Camera,
      title: "Community Watches",
      description: "Citizens spot suspicious bikes and submit sighting reports.",
      color: "bg-accent",
    },
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our system cross-references reports to find potential matches.",
      color: "bg-primary",
    },
    {
      icon: Bell,
      title: "Get Notified",
      description: "Receive instant alerts when your bike might have been spotted.",
      color: "bg-accent",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, community-driven approach to recovering stolen bikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-6 shadow-md border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`h-14 w-14 rounded-xl ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
