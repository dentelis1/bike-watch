import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import LocationPicker from "@/components/LocationPicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportSighting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sighting, setSighting] = useState<{
    image: File[];
    location: { address: string; lat?: number; lng?: number };
    notes: string;
  }>({
    image: [],
    location: { address: "" },
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sighting.image.length === 0) {
      toast({
        title: "Photo Required",
        description: "Please upload a photo of the bike you spotted.",
        variant: "destructive",
      });
      return;
    }

    if (!sighting.location.address) {
      toast({
        title: "Location Required",
        description: "Please provide the location where you spotted the bike.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store in localStorage for MVP demo
    const sightings = JSON.parse(localStorage.getItem("bikeSightings") || "[]");
    const newSighting = {
      id: crypto.randomUUID(),
      image: sighting.image[0]?.name,
      location: sighting.location,
      notes: sighting.notes,
      createdAt: new Date().toISOString(),
    };
    sightings.push(newSighting);
    localStorage.setItem("bikeSightings", JSON.stringify(sightings));
    
    setIsSubmitting(false);
    
    toast({
      title: "Sighting Reported",
      description: "Thank you for helping the community!",
    });
    
    navigate("/my-reports");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Camera className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">Report a Sighting</CardTitle>
                  <CardDescription>Spotted a bike that might be stolen?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Photo of the Bike *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Take a clear photo of the bike. Try to capture any identifying features.
                  </p>
                  <ImageUpload
                    maxImages={1}
                    images={sighting.image}
                    onChange={(images) => setSighting({ ...sighting, image: images })}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Location *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Where did you spot this bike? Use GPS for accuracy.
                  </p>
                  <LocationPicker
                    value={sighting.location}
                    onChange={(location) => setSighting({ ...sighting, location })}
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-base font-semibold">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any details about why it seemed suspicious, its condition, if it was locked, etc..."
                    value={sighting.notes}
                    onChange={(e) => setSighting({ ...sighting, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Info box */}
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-1">Anonymous Reporting</h4>
                  <p className="text-sm text-muted-foreground">
                    Your report is submitted anonymously. You're helping someone recover their property!
                  </p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Submit Sighting Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportSighting;
