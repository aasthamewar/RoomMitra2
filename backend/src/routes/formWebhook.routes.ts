// import { Router } from "express";
// import { db } from "../db/client";
// import axios from "axios";
// import { userScores } from "../db/schema";

// const router = Router();

// interface MLResponse {
//   score: number;
//   answer_used?: string;
//   status?: string;
// }

// router.post("/form-webhook", async (req, res) => {
//   try {
//     const answers = req.body;

//     const mlResponse = await axios.post<MLResponse>(
//       //"http://localhost:8000/form-webhook",
//       "http://127.0.0.1:8000/form-webhook",
//       answers 
//     );

//     const score = mlResponse.data.score;

//     await db
//       .insert(userScores)
//       .values({
//         userId: 1, // TEMP (resume-safe)
//         score,
//       })
//       .onConflictDoUpdate({
//         target: userScores.userId,
//         set: {
//           score,
//           updatedAt: new Date(),
//         },
//       });

//     res.json({
//       message: "Score saved successfully",
//       score,
//     });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res.status(500).json({ message: "Webhook processing failed" });
//   }
// });

// export default router;

import { Router } from "express";
import { db } from "../db/client";
import { userScores } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// router.post("/form-webhook", async (req, res) => {
//   try {
//     console.log("Formshare webhook received:", req.body);

//     const { responses } = req.body;

//     if (!responses) {
//       return res.status(400).json({ message: "No responses found" });
//     }

//     // 1️⃣ Normalize answers (IMPORTANT)
//     const answers = {
//     sleep: responses["daily_routine"] || responses["schedule"] || responses["Sleep Schedule"] || null,
//     cleanliness: responses["cleanliness"] || responses["tidy"] || responses["Cleanliness Level"] || null,
//     personality: responses["social_habits"] || responses["quiet_homebody"] || responses["personality"] || null,
//   };

//     // 2️⃣ TEMP userId (replace with auth later)
//     const userId = 1;

//     // 3️⃣ Call ML API
//     const mlResponse = await fetch(process.env.ML_API_URL!, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ answers }),
//     });

//     const mlData = await mlResponse.json();
//     const score = mlData.compatibility_score ?? mlData.score;

//     if (score === undefined) {
//       throw new Error("ML score missing");
//     }

//     // 4️⃣ Save score
//     const existing = await db
//       .select()
//       .from(userScores)
//       .where(eq(userScores.userId, userId));

//     if (existing.length === 0) {
//       await db.insert(userScores).values({ userId, score });
//     } else {
//       await db
//         .update(userScores)
//         .set({ score })
//         .where(eq(userScores.userId, userId));
//     }

//     return res.json({ success: true });
//   } catch (err) {
//     console.error("Form webhook error:", err);
//     return res.status(500).json({ success: false });
//   }
// });

// export default router

router.post("/form-webhook", async (req, res) => {
  try {
    // 1. Log EVERYTHING to see where Formshare put the userId
    console.log("Full Formshare Payload:", JSON.stringify(req.body, null, 2));

    const { responses } = req.body;

    // 2. Extract userId from the body (Formshare puts URL params here)
    // We check req.body.userId OR req.body.hidden?.userId depending on Formshare's version
    const incomingUserId = req.body.userId || req.body.hidden?.userId;
    
    // Convert to number if your DB expects an integer
    const userId = incomingUserId ? parseInt(String(incomingUserId)) : 1; 

    console.log("Saving score for UserId:", userId);

    if (!responses) {
      return res.status(400).json({ message: "No responses found" });
    }

    // Normalize answers
    const answers = {
  sleep: responses["daily_routine"] || responses["schedule"] || responses["Sleep Schedule"] || null,
  cleanliness: responses["cleanliness"] || responses["tidy"] || responses["Cleanliness Level"] || null,
  personality: responses["social_habits"] || responses["quiet_homebody"] || responses["personality"] || null,
  };

    // Call ML API
    const mlResponse = await fetch(process.env.ML_API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const mlData = await mlResponse.json();
    const score = mlData.compatibility_score ?? mlData.score;

    if (score === undefined) {
      throw new Error("ML score missing");
    }

    // 4. Save or Update score in DB
    const existing = await db
      .select()
      .from(userScores)
      .where(eq(userScores.userId, userId));

    if (existing.length === 0) {
      await db.insert(userScores).values({ userId, score });
    } else {
      await db
        .update(userScores)
        .set({ score })
        .where(eq(userScores.userId, userId));
    }

    return res.json({ success: true, userId_received: userId });
  } catch (err) {
    console.error("Form webhook error:", err);
    return res.status(500).json({ success: false });
  }
});

export default router