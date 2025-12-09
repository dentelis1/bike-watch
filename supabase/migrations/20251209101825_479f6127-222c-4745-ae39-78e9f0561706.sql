-- Create bike_reports table
CREATE TABLE public.bike_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  images TEXT[] NOT NULL DEFAULT '{}',
  color TEXT,
  brand TEXT,
  model TEXT,
  unique_features TEXT,
  stolen_date DATE,
  stolen_location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bike_sightings table
CREATE TABLE public.bike_sightings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT NOT NULL,
  location TEXT NOT NULL,
  notes TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create match_events table (for future notification system)
CREATE TABLE public.match_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bike_id UUID REFERENCES public.bike_reports(id) ON DELETE CASCADE NOT NULL,
  sighting_id UUID REFERENCES public.bike_sightings(id) ON DELETE CASCADE NOT NULL,
  match_confidence FLOAT NOT NULL DEFAULT 0,
  notification_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bike_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bike_sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;

-- Public read/write policies for MVP (no auth required)
CREATE POLICY "Anyone can view bike reports" ON public.bike_reports FOR SELECT USING (true);
CREATE POLICY "Anyone can create bike reports" ON public.bike_reports FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view bike sightings" ON public.bike_sightings FOR SELECT USING (true);
CREATE POLICY "Anyone can create bike sightings" ON public.bike_sightings FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view match events" ON public.match_events FOR SELECT USING (true);
CREATE POLICY "Anyone can create match events" ON public.match_events FOR INSERT WITH CHECK (true);