import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Camera, MapPin, Calendar, Plus, Inbox, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BikeReport {
  id: string;
  brand: string | null;
  model: string | null;
  color: string | null;
  unique_features: string | null;
  stolen_date: string | null;
  stolen_location: string | null;
  created_at: string;
}

interface BikeSighting {
  id: string;
  location: string;
  notes: string | null;
  created_at: string;
}

const MyReports = () => {
  const [reports, setReports] = useState<BikeReport[]>([]);
  const [sightings, setSightings] = useState<BikeSighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const [reportsRes, sightingsRes] = await Promise.all([
        supabase.from("bike_reports").select("*").order("created_at", { ascending: false }),
        supabase.from("bike_sightings").select("*").order("created_at", { ascending: false }),
      ]);

      if (reportsRes.data) setReports(reportsRes.data);
      if (sightingsRes.data) setSightings(sightingsRes.data);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const EmptyState = ({ type }: { type: "stolen" | "sighting" }) => (
    <div className="text-center py-12">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No {type === "stolen" ? "Reports" : "Sightings"} Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        {type === "stolen"
          ? "No stolen bikes have been reported yet."
          : "No bike sightings have been reported yet."}
      </p>
      <Link to={type === "stolen" ? "/report-stolen" : "/report-sighting"}>
        <Button variant="hero">
          <Plus className="h-4 w-4" />
          {type === "stolen" ? "Report Stolen Bike" : "Report Sighting"}
        </Button>
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Reports Dashboard</h1>
            <p className="text-muted-foreground">
              View all submitted reports and sightings.
            </p>
          </div>

          <Tabs defaultValue="stolen" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="stolen" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Stolen Bikes ({reports.length})
              </TabsTrigger>
              <TabsTrigger value="sightings" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Sightings ({sightings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stolen" className="space-y-4">
              {reports.length === 0 ? (
                <EmptyState type="stolen" />
              ) : (
                reports.map((report) => (
                  <Card key={report.id} className="shadow-md animate-fade-in">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {report.brand && report.model
                                ? `${report.brand} ${report.model}`
                                : report.color ? `${report.color} Bike` : "Bike Report"}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              {report.stolen_date && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(report.stolen_date).toLocaleDateString()}
                                </span>
                              )}
                              {report.stolen_location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {report.stolen_location.length > 30 
                                    ? report.stolen_location.slice(0, 30) + "..." 
                                    : report.stolen_location}
                                </span>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </CardHeader>
                    {report.unique_features && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          <strong>Features:</strong> {report.unique_features}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="sightings" className="space-y-4">
              {sightings.length === 0 ? (
                <EmptyState type="sighting" />
              ) : (
                sightings.map((sighting) => (
                  <Card key={sighting.id} className="shadow-md animate-fade-in">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Camera className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Bike Sighting</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(sighting.created_at).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {sighting.location.length > 30 
                                  ? sighting.location.slice(0, 30) + "..." 
                                  : sighting.location}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge>Submitted</Badge>
                      </div>
                    </CardHeader>
                    {sighting.notes && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          <strong>Notes:</strong> {sighting.notes}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyReports;
