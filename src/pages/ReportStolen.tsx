import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import LocationPicker from "@/components/LocationPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BikeReport {
  images: File[];
  brand: string;
  model: string;
  color: string;
  uniqueFeatures: string;
  stolenDate: string;
  stolenLocation: { address: string; lat?: number; lng?: number };
  contactEmail: string;
  contactPhone: string;
}

const ReportStolen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<BikeReport>({
    images: [],
    brand: "",
    model: "",
    color: "",
    uniqueFeatures: "",
    stolenDate: "",
    stolenLocation: { address: "" },
    contactEmail: "",
    contactPhone: "",
  });

  const totalSteps = 3;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("bike_reports").insert({
        images: report.images.map((f) => f.name),
        brand: report.brand || null,
        model: report.model || null,
        color: report.color || null,
        unique_features: report.uniqueFeatures || null,
        stolen_date: report.stolenDate || null,
        stolen_location: report.stolenLocation.address || null,
        contact_email: report.contactEmail || null,
        contact_phone: report.contactPhone || null,
      });

      if (error) throw error;

      toast({
        title: "Report Submitted",
        description: "We'll notify you if your bike is spotted.",
      });
      
      navigate("/my-reports");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return report.images.length > 0;
      case 2:
        return report.color && report.stolenDate && report.stolenLocation.address;
      case 3:
        return report.contactEmail || report.contactPhone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      s < step
                        ? "bg-primary text-primary-foreground"
                        : s === step
                        ? "bg-accent text-accent-foreground shadow-accent-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`hidden sm:block w-24 lg:w-32 h-1 mx-2 rounded-full ${
                        s < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Photos</span>
              <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Details</span>
              <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Contact</span>
            </div>
          </div>

          <Card className="shadow-lg border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-accent-glow">
                  <AlertTriangle className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">Report Stolen Bike</CardTitle>
                  <CardDescription>Step {step} of {totalSteps}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Photos */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label className="text-base font-semibold">Upload Photos</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add clear photos of your bike. The more angles, the better the chance of identification.
                    </p>
                    <ImageUpload
                      maxImages={5}
                      images={report.images}
                      onChange={(images) => setReport({ ...report, images })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Trek, Giant, Specialized"
                        value={report.brand}
                        onChange={(e) => setReport({ ...report, brand: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g., FX 3, Escape"
                        value={report.model}
                        onChange={(e) => setReport({ ...report, model: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color *</Label>
                    <Input
                      id="color"
                      placeholder="e.g., Matte Black, Red/White"
                      value={report.color}
                      onChange={(e) => setReport({ ...report, color: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Unique Markings</Label>
                    <Textarea
                      id="features"
                      placeholder="Describe any stickers, scratches, accessories, or unique features..."
                      value={report.uniqueFeatures}
                      onChange={(e) => setReport({ ...report, uniqueFeatures: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date Stolen *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={report.stolenDate}
                      onChange={(e) => setReport({ ...report, stolenDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location Stolen *</Label>
                    <LocationPicker
                      value={report.stolenLocation}
                      onChange={(stolenLocation) => setReport({ ...report, stolenLocation })}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <p className="text-muted-foreground">
                    We'll use this information to notify you if your bike is spotted. At least one contact method is required.
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={report.contactEmail}
                      onChange={(e) => setReport({ ...report, contactEmail: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={report.contactPhone}
                      onChange={(e) => setReport({ ...report, contactPhone: e.target.value })}
                    />
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-1">Privacy Note</h4>
                    <p className="text-sm text-muted-foreground">
                      Your contact information is kept private and will only be used to notify you about potential matches.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    variant="hero"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Submit Report
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportStolen;
