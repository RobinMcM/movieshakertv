import { db } from "./db";
import { users } from "./db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

async function seedDummyUser() {
  try {
    const email = "ms";
    const password = "movie";
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Try to check if user already exists
    try {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      if (existingUser) {
        console.log(`User with email "${email}" already exists. Skipping creation.`);
        process.exit(0);
      }
    } catch (checkError: any) {
      console.log("Note: Could not check for existing user (table may not exist yet). Proceeding with insert...");
    }
    
    // Insert the user (will fail if duplicate, which is fine)
    try {
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          passwordHash,
          role: "admin", // Make it an admin for testing
        })
        .returning();
      
      console.log(`✅ Successfully created dummy user:`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Role: ${newUser.role}`);
      console.log(`   ID: ${newUser.id}`);
    } catch (insertError: any) {
      if (insertError.message?.includes("duplicate") || insertError.message?.includes("unique")) {
        console.log(`User with email "${email}" already exists. Skipping creation.`);
      } else {
        throw insertError;
      }
    }
    
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding dummy user:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
}

seedDummyUser();

