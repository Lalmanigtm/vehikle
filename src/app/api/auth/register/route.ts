import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse body
    const body = await req.json();
    const { name, email, password } = body;

    // 2. Basic validation (fail fast before touching DB)
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 3. Connect to database
    await connectDb();

    // 4. Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 } // 409 Conflict is more accurate than 400
      );
    }

    // 5. Create user — password hashing happens automatically in pre("save") hook
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // Plain text here! The model hashes it automatically.
    });

    // 6. Return sanitized user (never return the raw Mongoose document)
    const sanitizedUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      { success: true, message: "User registered successfully", user: sanitizedUser },
      { status: 201 }
    );
  } catch (error) {
    // 7. Safe error logging (server only) + generic client message
    console.error("Registration error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}