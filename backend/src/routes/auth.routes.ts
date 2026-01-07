import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  const user = result[0];

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

/**
 * GET CURRENT USER
 */
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, req.userId!));

  res.json(result[0]);
});

// protected test route

// router.get("/protected-test", authMiddleware, (req: AuthRequest, res) => {
//   res.json({
//     message: "You are authenticated",
//     userId: req.userId,
//   });
// });


export default router;
