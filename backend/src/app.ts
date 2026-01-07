import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/rooms.routes";
import formWebhookRoutes from "./routes/formWebhook.routes";
import userScoreRoutes from "./routes/userScore.routes";
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Allow your frontend
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/webhook", formWebhookRoutes);
app.use("/user-score", userScoreRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

export default app;
