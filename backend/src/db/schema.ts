import { pgTable, serial,uuid, text, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});


/**
 * ROOMS (pre-listed)
 */
export const rooms = pgTable("rooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(), // Single Bed, Twin-sharing
  price: integer("price").notNull(),
  available: boolean("available").default(true),
});

/**
 * USER ↔ ROOM (one active room per user)
 */
export const userRooms = pgTable("user_rooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  roomId: uuid("room_id")
    .notNull()
    .references(() => rooms.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * ROOM SELECTIONS
 */
export const roomSelections = pgTable("room_selections", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull(),
    //.unique(),

  roomId: uuid("room_id")
    .notNull(),

  selectedAt: timestamp("selected_at").defaultNow(),
});

// ***  STORING THE LATEST SCORE IN DB  ***

export const userScores = pgTable("user_scores", {
  userId: integer("user_id").primaryKey(),
  score: integer("score").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


