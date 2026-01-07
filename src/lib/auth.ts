// Frontend-only auth utility for temporary testing without backend

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = "roomiematch_users";
const CURRENT_USER_KEY = "roomiematch_current_user";
const AUTH_TOKEN_KEY = "authToken";

// Get all stored users
export const getAllUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

// Save new user during signup
export const signupUser = (name: string, email: string, password: string): { success: boolean; message: string } => {
  const users = getAllUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }
  
  // Validate inputs
  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" };
  }
  
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters" };
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // In production, this would be hashed
  };
  
  // Save user
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true, message: "Account created successfully" };
};

// Login user
// export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: User } => {
//   const users = getAllUsers();
  
//   const user = users.find(u => u.email === email);
  
//   if (!user) {
//     return { success: false, message: "User not found" };
//   }
  
//   if (user.password !== password) {
//     return { success: false, message: "Invalid password" };
//   }
  
//   // Set current user and token
//   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
//   localStorage.setItem(AUTH_TOKEN_KEY, `token_${user.id}_${Date.now()}`);
  
//   return { success: true, message: "Login successful", user };
// };

// src/lib/auth.ts

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    // ✅ STORE REAL JWT FROM BACKEND
    localStorage.setItem("token", data.token);

    return {
      success: true,
      message: "Login successful",
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error. Please try again.",
    };
  }
};


// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(CURRENT_USER_KEY) && !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// Get current logged-in user
export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
