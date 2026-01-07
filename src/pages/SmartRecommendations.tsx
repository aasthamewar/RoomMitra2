import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Heart, Home, Users, TrendingUp, Filter, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecommendedRoom {
  id: string;
  type: "Single Bed" | "Twin-sharing";
  floor: string;
  cost: number;
  matchScore: number;
  features: string[];
  image: string;
}

interface RecommendedRoommate {
  id: string;
  name: string;
  avatar: string;
  age: number;
  compatibility: number;
  interests: string[];
  sleepSchedule: string;
}

const SmartRecommendations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rooms");
  //const [mlScore, setMlScore] = useState<number>(78);
  const [mlScore, setMlScore] = useState<number | null>(null);

  // AI-powered room recommendations based on user preferences
  const recommendedRooms: RecommendedRoom[] = [
    {
      id: "1",
      type: "Single Bed",
      floor: "Ground",
      cost: 12000,
      matchScore: 98,
      features: ["Window View", "AC", "Attached Bath", "Furnished"],
      image: "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      type: "Twin-sharing",
      floor: "1st",
      cost: 10000,
      matchScore: 95,
      features: ["Window View", "AC", "Attached Bath", "Furnished"],
      image: "https://images.unsplash.com/photo-1565186556514-9c09c17f1b13?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      type: "Single Bed",
      floor: "2nd",
      cost: 9000,
      matchScore: 87,
      features: ["Window View", "Natural Light", "Attached Bath"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    }
  ];

  // Fetch ML score and calculate roommate compatibility based on it
  // useEffect(() => {
  //   const fetchMLScore = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/latest-score");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMlScore(data.score || 78);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching ML score:", error);
  //     }
  //   };
  //   fetchMLScore();
  // }, []);
  // ADDED NEW LOGIC FOR SCORE
   useEffect(() => {
  const fetchMLScore = async () => {
    try {
      const response = await fetch(
        "https://f444a467f766.ngrok-free.app/latest-score",
        {
          headers: { "ngrok-skip-browser-warning": "true" }
        }
      );

      if (!response.ok) throw new Error("API failed");

      const data = await response.json();

      const score =
        data.compatibility_score ??
        data.score ??
        null;

      setMlScore(score);
    } catch (err) {
      console.error("ML score fetch failed", err);
      setMlScore(null);
    }
  };

     fetchMLScore();
      }, []);


  // Calculate roommate scores based on ML model score with variation
  //const baseScore = mlScore;
  const baseScore = mlScore ?? 60;

  const recommendedRoommates: RecommendedRoommate[] = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      age: 22,
      compatibility: Math.min(100, baseScore + 8),
      interests: ["Yoga", "Reading", "Cooking", "Photography"],
      sleepSchedule: "Early Bird"
    },
    {
      id: "2",
      name: "Anjali Gupta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      age: 21,
      compatibility: Math.min(100, baseScore + 3),
      interests: ["Music", "Art", "Travel", "Fitness"],
      sleepSchedule: "Regular"
    },
    {
      id: "3",
      name: "Shreya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      age: 23,
      compatibility: Math.min(100, baseScore-5),
      interests: ["Tech", "Gaming", "Movies", "Cooking"],
      sleepSchedule: "Night Owl"
    }
  ];
  
  // Sort ROOMAMATE
  const sortedRoommates = [...recommendedRoommates].sort(
  (a, b) => b.compatibility - a.compatibility
  );


  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-primary";
    if (score >= 80) return "text-secondary";
    return "text-muted-foreground";
  };

  // ADDED MATCH STRENGTH MESSAGE
  const getMatchStrength = (score: number) => {
  if (score >= 80)
    return {
      label: "Excellent Match",
      reason: "Your lifestyle and habits align very well"
    };

  if (score >= 60)
    return {
      label: "Good Match",
      reason: "Most preferences are compatible"
    };

  return {
    label: "Moderate Match",
    reason: "Some differences may need discussion"
  };
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">

      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">AI-Powered</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Smart Recommendations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalized room and roommate matches powered by AI. Discover your perfect match based on your preferences and lifestyle.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-1">
            <TabsTrigger value="rooms" className="gap-2">
              <Home className="w-4 h-4" />
              Room Matches
            </TabsTrigger>
            <TabsTrigger value="roommates" className="gap-2">
              <Users className="w-4 h-4" />
              Roommate Matches
            </TabsTrigger>
          </TabsList>

          {/* Add Match Strength Message  */}
        {mlScore !== null && (
          <Badge>
            {getMatchStrength(mlScore).label}
          </Badge>
        )}

          {/* Room Recommendations */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRooms.map((room, index) => (
                <Card
                  key={room.id}
                  className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer hover-elevate"
                  onClick={() => navigate("/rooms")}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={room.image}
                      alt={room.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Match Score Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground text-lg font-bold py-1 px-3 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {room.matchScore}%
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      {room.type}
                    </CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      ₹{room.cost.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      {room.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                      onClick={() => navigate("/rooms")}
                    >
                      View Room
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Roommate Recommendations */}
          <TabsContent value="roommates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRoommates.map((roommate) => (
                <Card
                  key={roommate.id}
                  className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer hover-elevate"
                >
                  <CardHeader className="pb-4">
                    <div className="text-center mb-4">
                      <Avatar className="w-24 h-24 mx-auto mb-3">
                        <AvatarImage src={roommate.avatar} alt={roommate.name} />
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                          {roommate.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl text-foreground">{roommate.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{roommate.age} years old</p>
                    </div>

                    {/* Compatibility Score */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${roommate.compatibility}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold text-lg ${getScoreColor(roommate.compatibility)}`}>
                        {roommate.compatibility}%
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Sleep Schedule</p>
                      <Badge variant="outline">{roommate.sleepSchedule}</Badge>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Interests</p>
                      <div className="flex gap-1 flex-wrap">
                        {roommate.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} className="bg-primary/10 text-primary text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Why These Recommendations Section */}
        <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg mt-12">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              How We Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-semibold text-foreground">Your Profile</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  We analyze your preferences, lifestyle, and priorities from your signup information.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-semibold text-foreground">AI Analysis</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our ML algorithm matches you with compatible rooms and roommates based on compatibility factors.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-semibold text-foreground">Smart Ranking</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Results are ranked by match score to show your best options first.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
          <Button
            variant="outline"
            className="border-muted hover:bg-muted text-foreground"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold"
            onClick={() => navigate("/rooms")}
          >
            Explore All Rooms
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
