const BACKEND_URL = "http://localhost:5000";

export async function fetchRooms() {
  const res = await fetch(`${BACKEND_URL}/rooms`);
  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return res.json();
}
