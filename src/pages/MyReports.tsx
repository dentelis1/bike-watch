import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Camera, MapPin, Calendar, Plus, Inbox } from "lucide-react";

interface BikeReport {
  id: string;
  brand?: string;
  model?: string;
  color: string;
  uniqueFeatures?: string;
  stolenDate: string;
  stolenLocation: { address: string };
  createdAt: string;
}

interface BikeSighting {
  id: string;
  location: { address: string };
  notes?: string;
  createdAt: string;
}

const MyReports = () => {
  const [reports, setReports] = useState<BikeReport[]>([]);
  const [sightings, setSightings] = useState<BikeSighting[]>([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("bikeReports") || "[]");
    const storedSightings = JSON.parse(localStorage.getItem("bikeSightings") || "[]");
    setReports(storedReports);
    setSightings(storedSightings);
  }, []);

  const EmptyState = ({ type }: { type: "stolen" | "sighting" }) => (
    <div className="text-center py-12">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No {type === "stolen" ? "Reports" : "Sightings"} Yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        {type === "stolen"
          ? "You haven't reported any stolen bikes yet."
          : "You haven't reported any bike sightings yet."}
      </p>
      <Link to={type === "stolen" ? "/report-stolen" : "/report-sighting"}>
        <Button variant="hero">
          <Plus className="h-4 w-4" />
          {type === "stolen" ? "Report Stolen Bike" : "Report Sighting"}
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Reports</h1>
            <p className="text-muted-foreground">
              Track your submitted reports and sightings.
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
                                : report.color + " Bike"}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(report.stolenDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {report.stolenLocation.address.slice(0, 30)}...
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </CardHeader>
                    {report.uniqueFeatures && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          <strong>Features:</strong> {report.uniqueFeatures}
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
                                {new Date(sighting.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {sighting.location.address.slice(0, 30)}...
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
