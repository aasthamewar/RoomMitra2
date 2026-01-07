import { Router } from "express";
import { db } from "../db/client";
import { roomSelections, rooms, users } from "../db/schema";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * SELECT ROOM (only once)
 */
// router.post("/select", authMiddleware, async (req: AuthRequest, res) => {
//   const { roomId } = req.body;
//   const userId = req.userId!;

//   if (!roomId) {
//     return res.status(400).json({ message: "roomId is required" });
//   }

  // try {
  //   // Attempt to insert selection
  //   await db.insert(roomSelections).values({
  //     userId,
  //     roomId,
  //   });

  //   res.status(201).json({ message: "Room selected successfully" });
  // } catch (error) {
  //   return res
  //     .status(400)
  //     .json({ message: "Room already selected" });
  // }
//   await db.insert(roomSelections).values({
//     userId,
//     roomId,
//   });

//   res.status(201).json({ message: "Room selected successfully" });
// });


router.post("/select", async (req, res) => {
  const { roomId, userId } = req.body;

  if (!roomId || !userId) {
    return res.status(400).json({ message: "roomId and userId are required" });
  }

  try {
    await db.insert(roomSelections).values({
      userId,
      roomId,
    });

    res.status(201).json({ message: "Room selected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to select room" });
  }
});




/**
 * GET MY SELECTED ROOM
 */
router.get("/my", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const result = await db
    .select({
      id: rooms.id,
      title: rooms.title,
      price: rooms.price,
      available: rooms.available,
      selectedAt: roomSelections.selectedAt,
    })
    .from(roomSelections)
    .innerJoin(rooms, eq(roomSelections.roomId, rooms.id))
    .where(eq(roomSelections.userId, userId));

  if (result.length === 0) {
    return res.json({ room: null });
  }

  res.json({ room: result[0] });
});

/**
 * GET ALL ROOMS (for frontend display)
 */
router.get("/", async (req, res) => {
  const allRooms = await db
    .select({
      id: rooms.id,
      title: rooms.title,
      price: rooms.price,
      available: rooms.available,
    })
    .from(rooms);

  res.json(allRooms);
});

/**
 * GET USERS WHO SELECTED A ROOM
 */
router.get("/:roomId/users", authMiddleware, async (req, res) => {
  const { roomId } = req.params;

  const usersInRoom = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(roomSelections)
    .innerJoin(users, eq(roomSelections.userId, users.id))
    .where(eq(roomSelections.roomId, roomId));

  return res.json({ users: usersInRoom });
});




export default router;
