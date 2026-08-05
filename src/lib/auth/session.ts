import { cookies } from "next/headers";
import crypto from "crypto";
import { User, UserRole } from "@/types/auth";
import { AUTH_COOKIE_NAME, SESSION_EXPIRY_DAYS } from "./constants";

// In-memory mock store for development
const usersStore = new Map<string, User>();
const sessionsStore = new Map<
  string,
  { userId: string; role: UserRole; expiresAt: Date }
>();

export const sessionService = {
  generateSessionToken(): string {
    return crypto.randomBytes(32).toString("hex");
  },

  async findOrCreateUser(identifier: string): Promise<User> {
    const existingUser = Array.from(usersStore.values()).find(
      (u) => u.phone === identifier || u.email === identifier || u.id === identifier
    );

    if (existingUser) {
      return existingUser;
    }

    const now = new Date();
    const newUser: User = {
      id: `usr_${Date.now()}`,
      phone: identifier.includes("@") ? "" : identifier,
      email: identifier.includes("@") ? identifier : "",
      fullName: "Devotee",
      role: "CUSTOMER",
      createdAt: now,
      updatedAt: now,
    };

    usersStore.set(newUser.id, newUser);
    return newUser;
  },

  async updateUserProfile(
    userId: string,
    data: { fullName?: string; email?: string; alternatePhone?: string }
  ): Promise<User> {
    const existingUser =
      usersStore.get(userId) ||
      Array.from(usersStore.values()).find((u) => u.id === userId);

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const updatedUser: User = {
      ...existingUser,
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.alternatePhone !== undefined && { alternatePhone: data.alternatePhone }),
      updatedAt: new Date(),
    };

    usersStore.set(updatedUser.id, updatedUser);
    return updatedUser;
  },

  async createSession(userId: string, role: UserRole): Promise<string> {
    const token = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

    sessionsStore.set(token, { userId, role, expiresAt });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return token;
  },

  async getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) return null;

    const session = sessionsStore.get(token);
    if (!session) return null;

    if (new Date() > session.expiresAt) {
      sessionsStore.delete(token);
      return null;
    }

    return { token, ...session };
  },

  async destroySession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (token) {
      sessionsStore.delete(token);
    }

    cookieStore.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });
  },
};