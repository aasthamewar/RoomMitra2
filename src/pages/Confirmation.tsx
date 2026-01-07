import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Home, Users, Sparkles, Heart, ChevronLeft, ChevronRight, Maximize2, Image } from "lucide-react";

interface Room {
  id: string;
  type: "Single Bed" | "Twin-sharing";
  windowSide: boolean;
  floor: string;
  airConditioning: "AC" | "Non-AC";
  furnishing: "Furnished" | "Non-Furnished";
  washroom: "Attached" | "Common";
  cost: number;
  modelUrl: string;
  images: string[];
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
    modelUrl: "/models/bedroom1.glb",
    images: [
      "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509599810694-b5a6eaf56fbc?w=800&h=600&fit=crop"
    ]
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
    modelUrl:"/models/bedroom1.glb",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565183938294-7563c3ff66ee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ]
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
    modelUrl:"/models/bedroom1.glb",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574909521539-eee4bf85db4b?w=800&h=600&fit=crop"
    ]
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
    modelUrl:"/models/bedroom1.glb",
    images: [
      "https://images.unsplash.com/photo-1565186556514-9c09c17f1b13?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=600&fit=crop"
    ]
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
    modelUrl:"/models/bedroom1.glb",
    images: [
      "https://images.unsplash.com/photo-1616261335940-28b14ec2cab1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573678776801-8bc6b31b66e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581331538633-27a7fb8a5eae?w=800&h=600&fit=crop"
    ]
  },
];

// Sample roommate data
const sampleRoommates = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    initials: "PS",
    age: 22,
    course: "Computer Science",
  },
  {
    id: "2",
    name: "Anjali Gupta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    initials: "AG",
    age: 21,
    course: "Business Administration",
  },
];

const celebratoryMessages = [
  "Your perfect space is ready to welcome you home!",
  "Congratulations! Your cozy sanctuary awaits!",
  "Welcome to your new home sweet home!",
  "Your dream room is all set and ready!",
  "Success! Your ideal living space is secured!",
];

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRoomId = location.state?.selectedRoomId;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showARView, setShowARView] = useState(false);
  
  const selectedRoom = sampleRooms.find(room => room.id === selectedRoomId);
  const randomMessage = celebratoryMessages[Math.floor(Math.random() * celebratoryMessages.length)];
  
  const handleNextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
    }
  };

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[hsl(var(--gradient-peach-start))] via-[hsl(var(--gradient-cream))] to-[hsl(var(--gradient-mint-end))] flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm p-8 text-center">
          <p className="text-lg text-room-accent-foreground mb-4">No room selected</p>
          <Button onClick={() => navigate("/rooms")} className="bg-room-success hover:bg-room-success/90 text-room-success-foreground">
            Go Back to Room Selection
          </Button>
        </Card>
      </div>
    );
  }

  const isSharedRoom = selectedRoom.type === "Twin-sharing";
  const roommate = isSharedRoom ? sampleRoommates[Math.floor(Math.random() * sampleRoommates.length)] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-primary" />
              <Sparkles className="w-6 h-6 text-secondary absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Room Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            {randomMessage}
          </p>
        </div>

        {/* Image Gallery and AR Viewer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Image Gallery */}
          <Card className="lg:col-span-2 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted overflow-hidden shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Room Gallery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Image Display */}
              <div className="relative group rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-96">
                <img
                  src={selectedRoom?.images[currentImageIndex]}
                  alt={`Room view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1}/{selectedRoom?.images.length}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedRoom?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary ring-2 ring-primary/50'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AR View Card */}
          <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-primary" />
                AR Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center mb-4 min-h-64">
                {showARView ? (
                  <div className="w-full h-full">
                    <model-viewer
                      src={selectedRoom?.modelUrl}
                      alt="3D room preview"
                      auto-rotate
                      camera-controls
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "0.5rem"
                      }}
                    ></model-viewer>
                  </div>
                ) : (
                  <div className="text-center">
                    <Maximize2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">Click to view 3D model</p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => setShowARView(!showARView)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {showARView ? "Hide 3D Model" : "View in 3D + AR"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Roommate Section */}
          {isSharedRoom && roommate && (
            <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Your Roommate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={roommate.avatar} alt={roommate.name} />
                  <AvatarFallback className="text-lg bg-primary/20 text-primary font-semibold">
                    {roommate.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {roommate.name}
                  </h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="text-sm">Age: {roommate.age}</p>
                    <p className="text-sm">Course: {roommate.course}</p>
                  </div>
                  <Badge className="mt-4 bg-primary text-primary-foreground gap-1">
                    <Heart className="w-3 h-3" />
                    Perfect Match!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Room Details */}
          <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Room Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg mb-4">
                <div className="text-3xl font-bold text-primary">
                  ₹{selectedRoom.cost.toLocaleString()}
                  <span className="text-lg font-normal text-muted-foreground block">/month</span>
                </div>
              </div>

              <Separator className="bg-muted" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Room Type:</span>
                  <span className="font-semibold text-foreground">{selectedRoom.type}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Window Side:</span>
                  <Badge variant={selectedRoom.windowSide ? "default" : "secondary"}>
                    {selectedRoom.windowSide ? "Yes" : "No"}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Floor:</span>
                  <span className="font-semibold text-foreground">{selectedRoom.floor} Floor</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Climate:</span>
                  <Badge variant={selectedRoom.airConditioning === "AC" ? "default" : "secondary"}>
                    {selectedRoom.airConditioning === "AC" ? "Air Conditioned" : "Natural"}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Furnishing:</span>
                  <Badge variant={selectedRoom.furnishing === "Furnished" ? "default" : "secondary"}>
                    {selectedRoom.furnishing}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm font-medium">Bathroom:</span>
                  <Badge variant={selectedRoom.washroom === "Attached" ? "default" : "secondary"}>
                    {selectedRoom.washroom === "Attached" ? "Private" : "Shared"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-5 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Payment</h4>
                <p className="text-sm text-muted-foreground">Complete your booking with a secure payment</p>
              </div>
              
              <div className="text-center p-5 rounded-lg bg-secondary/5 border border-secondary/10">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground">Submit required documents for verification</p>
              </div>
              
              <div className="text-center p-5 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Move In</h4>
                <p className="text-sm text-muted-foreground">Get your keys and settle into your new home!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={() => navigate("/rooms")}
            variant="outline"
            className="border-muted hover:bg-muted text-foreground"
          >
            Back to Room Selection
          </Button>
          <Button 
            onClick={() => navigate("/payment")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;