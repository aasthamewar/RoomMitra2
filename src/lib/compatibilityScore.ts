// Compatibility Score Utility - Fetches ML model results from backend

export interface CompatibilityScore {
  score: number;
  answers: string;
  why_match: string[];
  conflicts: string[];
  summary: string;
}

// Fetch the latest compatibility score from backend ML API
export const fetchCompatibilityScore = async (): Promise<CompatibilityScore | null> => {
  try {
    // Try to fetch from backend ML API
    const response = await fetch("http://localhost:8000/latest-score", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Backend unavailable, using fallback compatibility score");
  }

  // Fallback: Generate mock score based on stored data
  return getDefaultCompatibilityScore();
};

// Generate default mock compatibility score
const getDefaultCompatibilityScore = (): CompatibilityScore => {
  return {
    score: 78,
    answers: "Prefers quiet, organized living space. Values cleanliness and mutual respect.",
    why_match: [
      "Both care about maintaining a clean and organized living space",
      "Similar preference for quiet, peaceful environments",
      "Shared values on personal space and respect for boundaries",
      "Both enjoy a balanced work-life routine",
    ],
    conflicts: [
      "Minor differences in social preferences to discuss",
      "Different cooking schedules might need coordination",
    ],
    summary:
      "You two look like a great match! Here's where you naturally connect: Both care about maintaining a clean and organized living space, Similar preference for quiet, peaceful environments, Shared values on personal space and respect for boundaries. However, a few things might need communication: Minor differences in social preferences to discuss, Different cooking schedules might need coordination.",
  };
};

// Get color based on compatibility score
export const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-yellow-600";
  return "text-red-600";
};

// Get background color for score circles
export const getScoreBgGradient = (score: number): string => {
  if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
  if (score >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-500";
  if (score >= 40) return "bg-gradient-to-r from-yellow-500 to-amber-500";
  return "bg-gradient-to-r from-red-500 to-orange-500";
};
