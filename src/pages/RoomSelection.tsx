import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, Home, Wind, Building, Snowflake, Sofa, Droplets, Heart, Sparkles } from "lucide-react";

interface Room {
  id: string;
  type: "Single Bed" | "Twin-sharing";
  windowSide: boolean;
  floor: string;
  airConditioning: "AC" | "Non-AC";
  furnishing: "Furnished" | "Non-Furnished";
  washroom: "Attached" | "Common";
  cost: number;
  available: boolean;
}

const sampleRooms: Room[] = [
  {
    id: "1",
    type: "Single Bed",
    windowSide: true,
    floor: "Ground",
    airConditioning: "AC",
    furnishing: "Furnished",
    washroom: "Attached",
    cost: 12000,
    available: true,
  },
  {
    id: "2",
    type: "Twin-sharing",
    windowSide: false,
    floor: "1st",
    airConditioning: "AC",
    furnishing: "Furnished",
    washroom: "Common",
    cost: 8000,
    available: true,
  },
  {
    id: "3",
    type: "Single Bed",
    windowSide: true,
    floor: "2nd",
    airConditioning: "Non-AC",
    furnishing: "Non-Furnished",
    washroom: "Attached",
    cost: 9000,
    available: true,
  },
  {
    id: "4",
    type: "Twin-sharing",
    windowSide: true,
    floor: "1st",
    airConditioning: "AC",
    furnishing: "Furnished",
    washroom: "Attached",
    cost: 10000,
    available: true,
  },
  {
    id: "5",
    type: "Single Bed",
    windowSide: false,
    floor: "Ground",
    airConditioning: "Non-AC",
    furnishing: "Furnished",
    washroom: "Common",
    cost: 7500,
    available: true,
  },
  {
    id: "6",
    type: "Twin-sharing",
    windowSide: true,
    floor: "2nd",
    airConditioning: "AC",
    furnishing: "Non-Furnished",
    washroom: "Common",
    cost: 9500,
    available: false,
  },
];

const RoomSelection = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: "all",
    windowSide: "all",
    floor: "all",
    airConditioning: "all",
    furnishing: "all",
    washroom: "all",
    showAvailableOnly: true,
  });

  const filteredRooms = sampleRooms.filter((room) => {
    if (filters.showAvailableOnly && !room.available) return false;
    if (filters.type !== "all" && room.type !== filters.type) return false;
    if (filters.windowSide !== "all" && room.windowSide !== (filters.windowSide === "yes")) return false;
    if (filters.floor !== "all" && room.floor !== filters.floor) return false;
    if (filters.airConditioning !== "all" && room.airConditioning !== filters.airConditioning) return false;
    if (filters.furnishing !== "all" && room.furnishing !== filters.furnishing) return false;
    if (filters.washroom !== "all" && room.washroom !== filters.washroom) return false;
    return true;
  });

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleConfirm = () => {
    if (selectedRoom) {
      navigate("/confirmation", { state: { selectedRoomId: selectedRoom } });
    }
  };

  const getIconForFeature = (feature: string) => {
    switch (feature) {
      case "windowSide": return <Wind className="w-4 h-4" />;
      case "floor": return <Building className="w-4 h-4" />;
      case "airConditioning": return <Snowflake className="w-4 h-4" />;
      case "furnishing": return <Sofa className="w-4 h-4" />;
      case "washroom": return <Droplets className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Find Your Space</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Choose Your Perfect Room
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover rooms tailored to your lifestyle. Find the cozy space where you'll create memories with your perfect roommate.
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-12 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-soft">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Home className="w-5 h-5 text-primary" />
              </div>
              Refine Your Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-foreground font-medium">Room Type</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Single Bed">Single Bed</SelectItem>
                    <SelectItem value="Twin-sharing">Twin-sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="windowSide" className="text-foreground font-medium">Window Side</Label>
                <Select value={filters.windowSide} onValueChange={(value) => setFilters({...filters, windowSide: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="yes">Window Side</SelectItem>
                    <SelectItem value="no">Interior</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor" className="text-foreground font-medium">Floor Level</Label>
                <Select value={filters.floor} onValueChange={(value) => setFilters({...filters, floor: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="Any Floor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">Any Floor</SelectItem>
                    <SelectItem value="Ground">Ground Floor</SelectItem>
                    <SelectItem value="1st">1st Floor</SelectItem>
                    <SelectItem value="2nd">2nd Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ac" className="text-foreground font-medium">Climate Control</Label>
                <Select value={filters.airConditioning} onValueChange={(value) => setFilters({...filters, airConditioning: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="AC">Air Conditioned</SelectItem>
                    <SelectItem value="Non-AC">Natural Ventilation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="furnishing" className="text-foreground font-medium">Furnishing</Label>
                <Select value={filters.furnishing} onValueChange={(value) => setFilters({...filters, furnishing: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="Furnished">Furnished</SelectItem>
                    <SelectItem value="Non-Furnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="washroom" className="text-foreground font-medium">Bathroom</Label>
                <Select value={filters.washroom} onValueChange={(value) => setFilters({...filters, washroom: value})}>
                  <SelectTrigger className="bg-white/80 dark:bg-slate-900/80 border-muted">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900">
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="Attached">Attached</SelectItem>
                    <SelectItem value="Common">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3 bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg">
                <Switch 
                  id="available-only" 
                  checked={filters.showAvailableOnly}
                  onCheckedChange={(checked) => setFilters({...filters, showAvailableOnly: checked})}
                />
                <Label htmlFor="available-only" className="text-sm text-foreground font-medium cursor-pointer">
                  Available Only
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="text-primary font-bold">{filteredRooms.length}</span> room{filteredRooms.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Room Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredRooms.map((room) => (
              <Card 
                key={room.id}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                  selectedRoom === room.id 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-lg hover:scale-102 hover-elevate'
                } ${!room.available ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => room.available && handleRoomSelect(room.id)}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Selected badge */}
                {selectedRoom === room.id && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-primary text-primary-foreground gap-1 flex items-center">
                      <CheckCircle className="w-3 h-3" />
                      Selected
                    </Badge>
                  </div>
                )}
                
                {/* Unavailable badge */}
                {!room.available && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="destructive">Unavailable</Badge>
                  </div>
                )}

                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Home className="w-5 h-5" />
                    </div>
                    {room.windowSide && (
                      <Heart className="w-5 h-5 text-primary/60" />
                    )}
                  </div>
                  <CardTitle className="text-2xl text-foreground mb-2">{room.type}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">₹{room.cost.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground font-medium">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <div className="p-1.5 rounded-md bg-secondary/10">
                        {getIconForFeature("windowSide")}
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {room.windowSide ? "Window View" : "Interior"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <div className="p-1.5 rounded-md bg-secondary/10">
                        {getIconForFeature("floor")}
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {room.floor} Fl.
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <div className="p-1.5 rounded-md bg-secondary/10">
                        {getIconForFeature("airConditioning")}
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {room.airConditioning === "AC" ? "AC" : "Natural"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <div className="p-1.5 rounded-md bg-secondary/10">
                        {getIconForFeature("furnishing")}
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {room.furnishing.includes("Furnished") ? "Furnished" : "Bare"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="p-1.5 rounded-md bg-primary/20">
                      {getIconForFeature("washroom")}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {room.washroom === "Attached" ? "Private Bathroom" : "Shared Bathroom"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4 text-muted-foreground/50">
              <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">No rooms found</p>
            <p className="text-muted-foreground">Try adjusting your filters to see more options</p>
          </div>
        )}

        {/* Confirm Button */}
        {selectedRoom && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <Button 
              onClick={handleConfirm}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3 rounded-full shadow-lg font-semibold gap-2 h-12"
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Room Selection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSelection;