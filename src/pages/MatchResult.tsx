import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";

interface CompatibilityData {
  score: number;
  answers: string;
  why_match: string[];
  conflicts: string[];
  summary: string;
}

const MatchResult = () => {
  const navigate = useNavigate();
  const [userAvatarSrc, setUserAvatarSrc] = useState(avatar1);
  const [score, setScore] = useState<number | null>(null);
  const [data, setData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(true);

  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  useEffect(() => {
    // Fetch ML compatibility score from backend
    // const fetchScore = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5000/user-score/my-score");
      
    //   if (!res.ok) {
    //   throw new Error("Failed to fetch score");
    // }
    
    // HERE IS GEMINI CODE-------------
    const fetchScore = async (retries = 3) => {
    try {
    const token = localStorage.getItem("token") || "dummy-token"; // Ensure some token exists
    
    // 1. Define the base URL using Vite's environment variable system
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const res = await fetch(`${API_BASE_URL}/user-score/my-score`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const json = await res.json();
    console.log("Attempting to get score...", json);

    //temp
    console.log("Raw JSON from Backend:", json); // Log 1
    console.log("Type of json.score:", typeof json.score); // Log 2

    if (json.score !== null) {
      // Score found!
      setScore(json.score);
      setData({
        score: json.score,
        answers: "User responses analyzed",
        why_match: ["Lifestyle match", "Cleanliness match", "Personality alignment"],
        conflicts: [],
        summary: "Score generated from real user data."
      });
      setLoading(false); // <--- ADD THIS LINE HERE!
    } else if (retries > 0) {
      // Score not in DB yet, wait 2 seconds and try again
      console.log(`Score not ready, retrying... (${retries} left)`);
      setTimeout(() => fetchScore(retries - 1), 2000);
    } else {
      setLoading(false); // No score found after retries
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setLoading(false);
  }
};

// GEMINI CODE LOGIC ENDS HERE-------------------------------
        
    //     if (response.ok) {
    //       // const jsonData: CompatibilityData = await response.json();
    //       // setScore(jsonData.score);
    //       // setData(jsonData);
    //       const jsonData = await response.json();

    // console.log("ML API response:", jsonData);

    // // backend only returns score for now
    // const realScore =
    //   jsonData.compatibility_score ??
    //   jsonData.score ??
    //   null;

    // setScore(realScore);
    // console.log("Final score set in state:", realScore);
    // // ADD THIS 👇
    // if (realScore !== null) {
    //   localStorage.setItem("compatibilityScore", realScore.toString());
    // }
    // // keep UI happy using partial real data
    // setData({
    //   score: realScore,
    //   answers: "User responses analyzed",
    //   why_match: [
    //     "Lifestyle preferences evaluated",
    //     "Cleanliness habits compared",
    //     "Social compatibility analyzed"
    //   ],
    //   conflicts: [],
    //   summary: "This score is generated from real user responses."
    // });

    //     }
    //   } catch (error) {
    //     console.error("Error loading score:", error);
    //     // Use fallback score
    //     // setScore(78);
    //     // setData({
    //     //   score: 78,
    //     //   answers: "Preferences analyzed",
    //     //   why_match: [
    //     //     "Both care about cleanliness and organization",
    //     //     "Similar lifestyle preferences",
    //     //     "Compatible sleep schedules"
    //     //   ],
    //     //   conflicts: ["Minor differences to discuss"],
    //     //   summary: "You seem fairly compatible with each other!"
    //     // });

    //     // UPDATED AND REMOVE THE DEMO
    //     console.error("Error loading score:", error);
    //       setScore(null);
    //       setData(null);

    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // UPDATED SCORE FETCHING USING DB
  //   const json = await res.json();
  //     console.log("Backend score:", json);

  //     setScore(json.score ??null);

  //     setData({
  //       score: json.score,
  //       answers: "User responses analyzed",
  //       why_match: [
  //         "Lifestyle compatibility checked",
  //         "Cleanliness preferences matched",
  //         "Personality alignment analyzed"
  //       ],
  //       conflicts: [],
  //       summary: "Score generated from real user data."
  //     });
  //   } catch (err) {
  //     console.error("Failed to load score", err);
  //     setScore(null);
  //     setData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  

    // Load user avatar
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      try {
        const avatarData = JSON.parse(savedAvatar);
        if (avatarData.type === "uploaded") {
          setUserAvatarSrc(avatarData.data);
        } else if (avatarData.type === "selected") {
          setUserAvatarSrc(avatarImages[avatarData.index]);
        }
      } catch (e) {
        console.error("Error loading avatar:", e);
      }
    }

    fetchScore();
  }, []);

  const getScoreBgGradient = (score: number): string => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (score >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (score >= 40) return "bg-gradient-to-r from-yellow-500 to-amber-500";
    return "bg-gradient-to-r from-red-500 to-orange-500";
  };

  return (
    
    <div className="min-h-screen gradient-pages py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Perfect <span className="text-primary">Match Found!</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We've found your ideal roommate based on compatibility
          </p>
        </div>
        

        {/* Match Cards */}
        <div className="relative mb-16">
          <div className="flex justify-center items-center gap-8">
            {/* User Avatar Card */}
            <Card className="relative transform rotate-6 hover:rotate-3 transition-transform duration-300 shadow-card">
              <div className="p-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden mb-4">
                  <img
                    src={userAvatarSrc}
                    alt="Your avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground">You</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking for a roommate
                  </p>
                </div>
              </div>
            </Card>

            {/* Handshake Icon */}
            <div className="bg-primary/10 rounded-full p-4 animate-bounce">
              <div className="text-4xl">🤝</div>
            </div>

            {/* Match Avatar Card */}
            <Card className="relative transform -rotate-6 hover:-rotate-3 transition-transform duration-300 shadow-card">
              <div className="p-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden mb-4">
                  <img
                    src={avatar2}
                    alt="Match avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground">Sarah M.</h3>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Match Score */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-col items-center">
            <div
              className={`w-32 h-32 rounded-full ${getScoreBgGradient(
                score || 0
              )} flex items-center justify-center shadow-soft mb-4`}
            >
              <div className="text-4xl font-bold text-white">
                {loading ? "..." : score}
              </div>
            </div>
            <div className="text-lg font-semibold text-foreground">
              Compatible
            </div>
          </div>
        </div>



        {/* Match Details */}
        <Card className="mt-12 p-6 shadow-card">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Why You're a Great Match
          </h3>

          {/* Summary from ML Model */}
          {data?.summary && (
            <p className="text-center text-muted-foreground mb-8 italic">
              {data.summary}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Positives */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-foreground">What Works</h4>
              </div>
              <div className="space-y-3">
                {data?.why_match && data.why_match.length > 0 ? (
                  data.why_match.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground text-sm">
                      Compatible living style
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Conflicts/Things to Discuss */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-foreground">To Discuss</h4>
              </div>
              <div className="space-y-3">
                {data?.conflicts && data.conflicts.length > 0 ? (
                  data.conflicts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground text-sm">
                      No major conflict areas detected
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Explore Page Button */}
        <div className="flex justify-center mt-10">
          <Button
            style={{ backgroundColor: "rgb(245,151,148)" }}
            className="text-white text-xl px-12 py-4 rounded-full shadow-lg border-0"
            onClick={() => navigate("/room-selection")}
          >
            Explore Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchResult;
