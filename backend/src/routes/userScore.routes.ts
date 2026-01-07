import { Router } from "express";
import { db } from "../db/client";
import { userScores } from "../db/schema";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET logged-in user's compatibility score
 */
router.get("/my-score", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId =
      process.env.NODE_ENV === "production"
        ? req.userId
        : 1; // local dev fallback

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await db
      .select({ score: userScores.score })
      .from(userScores)
      .where(eq(userScores.userId, userId))
      .limit(1);

    if (result.length === 0) {
      return res.json({ score: null });
    }

    return res.json({ score: result[0].score });
  } catch (error) {
    console.error("Error fetching user score:", error);
    return res.status(500).json({ message: "Failed to fetch score" });
  }
});

export default router;
